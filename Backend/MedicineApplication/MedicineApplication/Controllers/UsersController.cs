using EcommerceApplication.Models;
using MedicineApplication.Models;
using MedicineApplication.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MedicineApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepository _usersRepository;
        public UsersController(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }

        [HttpPost]
        [Route("Registration")]
        public async Task<ActionResult<Users>> Register(Users user)
        {
            return Ok(await _usersRepository.AddUser(user));
        }
        [HttpGet]
        public async Task<ActionResult<Users>> GetUsers()
        {
            return Ok(await _usersRepository.GetUsers());

        }
        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult<Users>> AuthenticateUser(Users userLogin)
        {
            return Ok(await _usersRepository.LoginUser(userLogin));
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Users>> GetUser(int id)
        {
            return Ok(await _usersRepository.GetUser(id));
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Users>> UpdateUser(int id,Users users)
        {
            return Ok(await _usersRepository.UpdateUser(id,users));
        }
        [HttpPost]
        [Route("AddToCart")]
        public async Task<ActionResult<Cart>> AddProductToCart(Cart cart)
        {
            return Ok(await _usersRepository.AddProductToCart(cart));
        }
        [HttpGet]
        [Route("GetCartItems")]
        public async Task<ActionResult<Cart>> GetCartItemsByUserId(int userId)
        {
            return Ok(await _usersRepository.GetCartItemsByUserId(userId));
        }
        [HttpDelete]
        [Route("RemoveFromCart")]
        public async Task<ActionResult<StatusResponse>> RemoveFromCart(int id)
        {
            return(await _usersRepository.RemoveFromCart(id));
        }
        [HttpPut]
        [Route("UpdateQuantity")]
        public async Task<ActionResult<Cart>> UpdateQuantity(int id, Cart cart)
        {
            return Ok(await _usersRepository.UpdateQuantity(id, cart));
        }
       
    }
}
