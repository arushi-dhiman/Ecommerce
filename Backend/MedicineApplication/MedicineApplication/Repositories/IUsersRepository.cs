using EcommerceApplication.Models;
using MedicineApplication.Models;

namespace MedicineApplication.Repositories
{
    public interface IUsersRepository {

        Task<IEnumerable<Users>> GetUsers();
        Task<Response> GetUser(int id);
        Task<Response> AddUser(Users user);
        Task<Users> UpdateUser(int id,Users user);
        void DeleteUser(int id);
        Task<Response> LoginUser(Users userLogin);

        Task<StatusResponse> AddProductToCart(Cart cart);

        Task<IEnumerable<Cart>> GetCartItemsByUserId(int userId);
        Task<StatusResponse> RemoveFromCart(int id);
        Task<Cart> UpdateQuantity(int id, Cart cart);


    }
}
