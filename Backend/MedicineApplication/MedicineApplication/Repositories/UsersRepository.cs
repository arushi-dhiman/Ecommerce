
using EcommerceApplication.Models;
using MedicineApplication.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace MedicineApplication.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        private readonly RepositoryContext _context;
        public UsersRepository(RepositoryContext context)
        { 
            _context = context;
        }

        public async Task<StatusResponse> AddProductToCart(Cart cart)
        {
            cart.Quantity = 1;
            _context.Cart.Add(cart);
            await _context.SaveChangesAsync();
            return new StatusResponse()
            {
                StatusCode = StatusCodes.Status200OK,
                StatusMessage = "Item added succesfully"
            };

        }

        public async Task<Response> AddUser(Users user)
        {
            Response response = new Response();
            _context.Users.Add(user);
            user.Type = "User";
            user.CreatedOnDate = DateTime.Now;
            user.Status = true;
            response.User = user;
            await _context.SaveChangesAsync();

            return response;

        }



        public async void DeleteUser(int id)
        {
            var res = await _context.Users.Where(a => a.ID == id).FirstOrDefaultAsync();
            if(res != null)
            {
                 _context.Users.Remove(res);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Cart>> GetCartItemsByUserId(int userId)
        {
            List<Cart> cartList = new List<Cart>();

            if (userId != 0)
            {
                foreach (var cart in _context.Cart.ToList())
                {
                    if(cart.UserId == userId)
                    {
                        var item = _context.Items.Where(a => a.Id == cart.ItemId).FirstOrDefault();
                        cart.ItemName = item.ItemDescription;
                        cart.ItemImage = item.ItemImage;
                        cart.Price = cart.Price;
                        cart.DiscountPrice = cart.DiscountPrice;
                        cartList.Add(cart); 
                    }
                }
            }
            return cartList;


        }

        public async Task<Response> GetUser(int id)
        {
            Response response = new Response();
            try
            {
                var user = await _context.Users.Where(a => a.ID == id).FirstOrDefaultAsync();

                response.User = user;
                return response;
            }
            catch (Exception) { }
            {
                return new Response()
                {
                    Status = new StatusResponse()
                    {
                        StatusCode = 404,
                        StatusMessage = "Invalid"
                    }
                };
            }
        }
    

        public async Task<IEnumerable<Users>> GetUsers()
        {
      
            return await _context.Users.ToListAsync();
        }


        public async Task<Response> LoginUser(Users userLogin)
        {
            Response response = new Response();
            Users _user = null;
            try
            {
                var login = _context.Users.Where(a => a.Email == userLogin.Email && a.Password == userLogin.Password).FirstOrDefault();

                if (login != null)
                {
                    _user = new Users { Email = userLogin.Email, Password = userLogin.Password };
                    response.User = login;
                    return response;

                }
            }
            catch(Exception) { }
            {
                return new Response
                {
                    Status = new StatusResponse()
                    {
                        StatusCode = StatusCodes.Status401Unauthorized,
                        StatusMessage = "Invalid Credentials"

                    }
                };
            }
        }

        public async Task<StatusResponse> RemoveFromCart(int id)
        {
            var res = await _context.Cart.Where(a => a.Id == id).FirstOrDefaultAsync();
            if (res != null)
            {
                _context.Cart.Remove(res);
                await _context.SaveChangesAsync();

                return new StatusResponse()
                {
                    StatusCode = StatusCodes.Status200OK,
                    StatusMessage = "Item removed"
                };
            }
            else
            {
                return new StatusResponse()
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    StatusMessage = "Item not found"
                };
            }
        }



        public async Task<Users> UpdateUser(int id, Users user)
            {

            if(id == user.ID)
            {
                _context.Entry(user).State = EntityState.Modified;
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)

                {
                    throw;
                }

            }
            return user;

        }

        public async Task<Cart> UpdateQuantity(int id,Cart cart)
        {
            if(id == cart.Id)
            {
                var items = _context.Items.Where(a => a.Id == cart.ItemId).FirstOrDefault();
                cart.Price = items.Price * cart.Quantity;
                cart.DiscountPrice = (items.Price - items.Price*items.Discount/100)  * cart.Quantity;
                _context.Entry(cart).State = EntityState.Modified;
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)

                {
                    throw;
                }
            }
            return cart;
        }
    }
}
