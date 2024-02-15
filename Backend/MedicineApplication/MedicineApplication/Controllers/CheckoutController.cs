using EcommerceApplication.Models;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stripe.Checkout;

namespace EcommerceApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckoutController : ControllerBase
    {
        public readonly IConfiguration _configuration;
        public static string s_wasmClientUrl = string.Empty;
        public CheckoutController(IConfiguration configuration) 
        {
            _configuration = configuration;
            
        }
        [HttpPost]
        public async Task<ActionResult> CheckoutOrder([FromBody] List<Cart> cart,double totalDiscountPrice, [FromServices] IServiceProvider sp)
        {
            var referer = Request.Headers.Referer;
            s_wasmClientUrl = referer[0];
            var server = sp.GetRequiredService<IServer>();
            var serverAddressFeature = server.Features.Get<IServerAddressesFeature>();
            string? thisApiUrl = null;
            if (serverAddressFeature != null)
            {
                thisApiUrl = serverAddressFeature.Addresses.FirstOrDefault();
            }
            if(thisApiUrl != null) 
            {
                var sessionId = await Checkout(cart, totalDiscountPrice, thisApiUrl);
                var publishableKey = _configuration["Stripe:PublishableKey"];
                var checkoutOrderResponse = new CheckoutOrderResponse()
                {
                    SessionId = sessionId,
                    PublishableKey = publishableKey,
                };
                return Ok(checkoutOrderResponse);
            }
            else
            {
                return StatusCode(500);
            }

        }

        [NonAction]
        public async Task<string> Checkout(List<Cart> cart, double totalDiscountPrice, string thisApiUrl)
        {

            var options = new SessionCreateOptions
            {
                SuccessUrl = $"{thisApiUrl}/checkout/success?sessionId=" + "{CHECKOUT_SESSION_ID}",
                CancelUrl = s_wasmClientUrl + "failed",
                PaymentMethodTypes = new List<string>
                {
                    "card"
                },
                LineItems = new List<SessionLineItemOptions> { 
                    new()
                    {
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            UnitAmount = Convert.ToInt64(totalDiscountPrice),
                            Currency = "inr",
                            ProductData = new SessionLineItemPriceDataProductDataOptions
                            {
                                Name = cart.FirstOrDefault().ItemName,
                                Images = new List<string> {cart.FirstOrDefault().ItemImage}
                            },
                        },
                        Quantity = cart.FirstOrDefault().Quantity,
                    },
                },
                Mode     = "payment"
            };
            var service = new SessionService();
            var session = await service.CreateAsync(options);
            return session.Id;
        }

        [HttpGet]
        public ActionResult CheckoutSuccess(string sessionId)
        {
            var sessionService = new SessionService();
            var session = sessionService.Get(sessionId);
            var total = session.AmountTotal.Value;
            var customerEmail = session.CustomerDetails.Email;
            return Redirect(s_wasmClientUrl + "success");
        }
    }
}
