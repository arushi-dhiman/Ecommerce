using EcommerceApplication.Models;
using EcommerceApplication.Paginate;
using MedicineApplication.Models;
using MedicineApplication.Repositories;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.IO;

namespace MedicineApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminRepository _adminRepository;

        public AdminController(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;

        }
        [HttpPost]
        [Route("UploadImage")]
        public async Task<ActionResult<Category>> AddCategory([FromForm] FileUpload i)
        {
            Category category = new Category
            {
                CategoryName = i.FileName,
                CategoryDescription = i.FileDescription,
                file = i.file
            };
            return Ok(await _adminRepository.AddCategory(category));
        }


        [HttpGet]
        [Route("GetAll")]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategory()
        {
            return Ok(await _adminRepository.GetCategory());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Category>> UpdateCategory(int id, [FromForm] FileUpload fileUpload)
        {
            Category category = new Category
            {
                CategoryName = fileUpload.FileName,
                CategoryDescription = fileUpload.FileDescription,
                file = fileUpload.file,
                Id = id
            };
            return Ok(await _adminRepository.UpdateCategory(id, category));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<StatusResponse>> DeleteCategory(int id)
        {
            return Ok(await _adminRepository.DeleteCategory(id));
        }

        [HttpPost]
        [Route("Products")]
        public async Task<ActionResult<Products>> AddProducts([FromForm] FileUpload file)
        {
            Products products = new Products
            {
                ProductName = file.FileName,
                ProductDescription = file.FileDescription,
                file = file.file,
                CategoryId = file.CategoryId
            };
            return Ok(await _adminRepository.AddProducts(products));
        }

        [HttpPut("UpdateProducts/{id}")]
        public async Task<ActionResult<Products>> UpdateProduct(int id, [FromForm] FileUpload fileUpload)
        {
            Products products = new Products
            {
                ProductName = fileUpload.FileName,
                ProductDescription = fileUpload.FileDescription,
                file = fileUpload.file,
                CategoryId = fileUpload.CategoryId,
                Id = id
            };
            return Ok(await _adminRepository.UpdateProduct(id, products));
        }
        [HttpDelete("Products/{id}")]
        public async Task<ActionResult<StatusResponse>> DeleteProduct(int id)
        {
            return Ok(await _adminRepository.DeleteProduct(id));
        }
        [HttpGet]
        [Route("GetProducts")]
        public ActionResult<Pagination<PaginatedProducts>> GetSpecificProducts([FromQuery] ProductParams productParams)
        {
            return Ok( _adminRepository.GetSpecificProducts(productParams));
        }


        [HttpPost]
        [Route("ProductItems")]
        public async Task<ActionResult<Products>> AddItems([FromForm] FileUpload file)
        {
            Items items = new Items
            {
                ItemName = file.FileName,
                ItemDescription = file.FileDescription,
                file = file.file,
                ProductId = file.ProductId,
                Price = file.Price,
                Discount = file.Discount,
                
            };
            return Ok(await _adminRepository.AddItems(items));
        }
        [HttpGet]
        [Route("GetProductItems")]
        public ActionResult<Pagination<PaginatedProducts>> GetSpecificProductItems([FromQuery] ProductParams productParams)
        {
            return Ok(_adminRepository.GetSpecificItems(productParams));
        }

        [HttpPut("UpdateItems/{id}")]
        public async Task<ActionResult<Products>> UpdateItem(int id, [FromForm] FileUpload fileUpload)
        {
            Items items = new Items
            {
                ItemName = fileUpload.FileName,
                ItemDescription = fileUpload.FileDescription,
                file = fileUpload.file,
                ProductId = fileUpload.ProductId,
                Price= fileUpload.Price,
                Discount= fileUpload.Discount,
                Id = id
            };
            return Ok(await _adminRepository.UpdateItem(id, items));
        }
        [HttpDelete("Items/{id}")]
        public async Task<ActionResult<StatusResponse>> DeleteItem(int id)
        {
            return Ok(await _adminRepository.DeleteItem(id));
        }

    }
}
