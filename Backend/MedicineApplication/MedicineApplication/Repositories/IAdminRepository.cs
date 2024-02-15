using EcommerceApplication.Models;
using EcommerceApplication.Paginate;
using MedicineApplication.Models;

namespace MedicineApplication.Repositories
{
    public interface IAdminRepository
    {
        Task<Category> AddCategory(Category category);
        Task<IEnumerable<Category>> GetCategory();
        Task<Category> UpdateCategory(int id, Category category);
        Task<StatusResponse> DeleteCategory(int id);

        Task<Products> AddProducts(Products products);
        PaginatedProducts GetSpecificProducts(ProductParams productParams);

        Task<Products> UpdateProduct(int id, Products products);
        Task<StatusResponse> DeleteProduct(int id);

        Task<Items> AddItems(Items items);
        PaginatedProducts GetSpecificItems(ProductParams productParams);
        Task<Items> UpdateItem(int id, Items items);
        Task<StatusResponse> DeleteItem(int id);






    }
}
