using EcommerceApplication.Models;
using EcommerceApplication.Paginate;
using MedicineApplication.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Runtime.Intrinsics.Arm;
using static System.Net.Mime.MediaTypeNames;

namespace MedicineApplication.Repositories
{
    public class AdminRepository : IAdminRepository
    {
        private readonly RepositoryContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IWebHostEnvironment _webHostEnvironment;


        public AdminRepository(RepositoryContext context, IHttpContextAccessor httpContextAccessor, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            _webHostEnvironment = webHostEnvironment;
        }
        public async Task<Category> AddCategory(Category category)
        {
            string localPath = await UploadImage(category.file);
            category.CategoryImage = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}{_httpContextAccessor.HttpContext.Request.PathBase}/Utility/Images/{category.file.FileName}";
            _context.Category.Add(category);
            await _context.SaveChangesAsync();
            return category;
        }


        public async Task<IEnumerable<Category>> GetCategory()
        {
            return await _context.Category.ToListAsync();
        }



        public async Task<string> UploadImage(IFormFile file)
        {
            string path = Path.Combine(_webHostEnvironment.ContentRootPath, @"Utility\Images");
            string fileImagePath = Path.Combine(path, file.FileName);
            using (var stream = new FileStream(fileImagePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return fileImagePath;
        }
        public void DeleteImage(string imageName)
        {
            string path = Path.Combine(_webHostEnvironment.ContentRootPath, @"Utility\Images");
            string fileImagePath = Path.Combine(path, imageName);
            if (File.Exists(fileImagePath))
            {
                File.Delete(fileImagePath);
            }

        }



        public async Task<Category> UpdateCategory(int id, Category category)
        {

            if (category.file != null)
            {
                DeleteImage(category.file.FileName);
                string localPath = await UploadImage(category.file);
            }
            if (id == category.Id)
            {
                category.CategoryImage = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}{_httpContextAccessor.HttpContext.Request.PathBase}/Utility/Images/{category.CategoryName + ".jpg"}";
                _context.Entry(category).State = EntityState.Modified;

            }
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return category;
        }

        public async Task<StatusResponse> DeleteCategory(int id)
        {
            Response response = new Response();
            var category = await _context.Category.FindAsync(id);
            if (category != null)
            {
                if (category.CategoryImage != null)
                {
                    var imageName = category.CategoryImage.Split('/').Last();
                    DeleteImage(imageName);
                }
                _context.Category.Remove(category);
                await _context.SaveChangesAsync();
            }
            else
            {
                return new StatusResponse()
                {
                    StatusCode = 500,
                    StatusMessage = "Cannot Delete"

                };
            }
            return new StatusResponse()
            {
                StatusCode = 200,
                StatusMessage = "Deleted successfully"

            };
        }


        public async Task<Products> AddProducts(Products products)
        {
            string localPath = await UploadImage(products.file);

            products.ProductImage = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}{_httpContextAccessor.HttpContext.Request.PathBase}/Utility/Images/{products.file.FileName}";

            _context.Products.Add(products);
            await _context.SaveChangesAsync();
            return products;
        }

        //public async Task<IEnumerable<Products>> GetProducts()
        //{
        //    var products = _context.Products.ToList();
        //    foreach (var product in products)
        //    {
        //        var category = _context.Category.FirstOrDefault(x => x.Id == product.CategoryId);
        //        product.CategoryName = category.CategoryName;
        //    }

        //    return products;

        //}

        public async Task<Products> UpdateProduct(int id, Products products)
        {
            if (products.file != null)
            {
                DeleteImage(products.file.FileName);
                string localPath = await UploadImage(products.file);
            }
            if (id == products.Id)
            {
                products.ProductImage = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}{_httpContextAccessor.HttpContext.Request.PathBase}/Utility/Images/{products.ProductName + ".jpg"}";
                _context.Entry(products).State = EntityState.Modified;

            }
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return products;
        }
        public async Task<StatusResponse> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product != null)
            {
                if (product.ProductImage != null)
                {
                    var imageName = product.ProductImage.Split('/').Last();
                    DeleteImage(imageName);
                }
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
            }
            else
            {
                return new StatusResponse()
                {
                    StatusCode = 500,
                    StatusMessage = "Cannot Delete"

                };
            }
            return new StatusResponse()
            {
                StatusCode = 200,
                StatusMessage = "Deleted successfully"

            };
        }

        public PaginatedProducts GetSpecificProducts(ProductParams productParams)
        {
            //PaginatedProducts paginatedProducts = new();
            if (productParams.CategoryId == 0)
            {
                var products = Pagination<Products>.ToPageList(_context.Products.OrderBy(ob => ob.Id).ToList(),
                    productParams.PageNumber, productParams.PageSize);
                var metadata = new
                {
                    products.PageSize,
                    products.PageCount,
                    products.PageIndex,
                    products.PreviousPage,
                    products.NextPage,
                    products.TotalPages
                };
                if (productParams.SearchTerm != null)
                {
                    foreach (var product in _context.Products.ToList())
                    {
                        var category = _context.Category.FirstOrDefault(x => x.Id == product.CategoryId);
                        product.CategoryName = category.CategoryName;
                    }
                    var searchProducts = _context.Products.Where(x => x.ProductName.ToLower().StartsWith(productParams.SearchTerm) ||
                    x.ProductDescription.ToLower().StartsWith(productParams.SearchTerm)).ToList();
                    return new PaginatedProducts
                    {
                        PaginationDetails = metadata,
                        Products = searchProducts
                    };
                }
                else
                {
                    foreach (var product in _context.Products.ToList())
                    {
                        var category = _context.Category.FirstOrDefault(x => x.Id == product.CategoryId);
                        product.CategoryName = category.CategoryName;
                    }
                    return new PaginatedProducts
                    {
                        PaginationDetails = metadata,
                        Products = products
                    };
                }
            }
            else
            {
                var list = new List<Products>();
                if (productParams.SearchTerm != null)
                {
                    foreach (var product in _context.Products.ToList())
                    {
                        if (product.CategoryId == productParams.CategoryId)
                        {
                            var category = _context.Category.FirstOrDefault(x => x.Id == productParams.CategoryId);
                            product.CategoryName = category.CategoryName;
                            list.Add(product);
                        }
                    }
                    var categoryProducts = Pagination<Products>.ToPageList(list.OrderBy(ob => ob.Id), productParams.PageNumber, productParams.PageSize);
                    var metadata = new
                    {
                        categoryProducts.PageSize,
                        categoryProducts.PageCount,
                        categoryProducts.PageIndex,
                        categoryProducts.PreviousPage,
                        categoryProducts.NextPage,
                        categoryProducts.TotalPages
                    };

                    var searchData = list.Where(x => x.ProductName.ToLower().StartsWith(productParams.SearchTerm) ||
                    x.ProductDescription.ToLower().StartsWith(productParams.SearchTerm)).ToList();
                   
                    return new PaginatedProducts
                    {
                        PaginationDetails = metadata,
                        Products = searchData
                    }; 
                }
                else
                {

                    foreach (var product in _context.Products.ToList())
                    {
                        if (product.CategoryId == productParams.CategoryId)
                        {
                            var category = _context.Category.FirstOrDefault(x => x.Id == productParams.CategoryId);
                            product.CategoryName = category.CategoryName;
                            list.Add(product);
                        }

                    }
                    var categoryProducts = Pagination<Products>.ToPageList(list.OrderBy(ob => ob.Id), productParams.PageNumber, productParams.PageSize);
                    var metadata = new
                    {
                        categoryProducts.PageSize,
                        categoryProducts.PageCount,
                        categoryProducts.PageIndex,
                        categoryProducts.PreviousPage,
                        categoryProducts.NextPage,
                        categoryProducts.TotalPages
                    };

                    return new PaginatedProducts
                    {
                        PaginationDetails =  metadata,
                        Products = categoryProducts
                    };
                }

            }
        }

        public async Task<Items> AddItems(Items items)
        {
            string localPath = await UploadImage(items.file);
            items.ItemImage = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}{_httpContextAccessor.HttpContext.Request.PathBase}/Utility/Images/{items.file.FileName}";
            _context.Items.Add(items);
            await _context.SaveChangesAsync();
            return items;
        }

        public PaginatedProducts GetSpecificItems(ProductParams productParams)
        {
            if (productParams.ProductId == 0)
            {
                var items = Pagination<Items>.ToPageList(_context.Items.OrderBy(ob => ob.Id).ToList(),
                    productParams.PageNumber, productParams.PageSize);
                var metadata = new
                {
                    items.PageSize,
                    items.PageCount,
                    items.PageIndex,
                    items.PreviousPage,
                    items.NextPage,
                    items.TotalPages
                };
                if (productParams.SearchTerm != null)
                {
                    foreach (var item in _context.Items.ToList())
                    {
                        var product = _context.Products.FirstOrDefault(x => x.Id == item.ProductId);
                        item.ProductName = product.ProductName;
                    }
                    var searchItems = _context.Items.Where(x => x.ItemName.ToLower().StartsWith(productParams.SearchTerm) ||
                    x.ItemDescription.ToLower().StartsWith(productParams.SearchTerm)).ToList();
                    return new PaginatedProducts
                    {
                        PaginationDetails = metadata,
                        Items = searchItems
                    };
                }
                else
                {
                    foreach (var item in _context.Items.ToList())
                    {
                        var product = _context.Products.FirstOrDefault(x => x.Id == item.ProductId);
                        item.ProductName = product.ProductName;
                    }
                    return new PaginatedProducts
                    {
                        PaginationDetails = metadata,
                        Items = items
                    };
                }
            }
            else
            {
                var list = new List<Items>();
                if (productParams.SearchTerm != null)
                {
                    foreach (var item in _context.Items.ToList())
                    {
                        if (item.ProductId == productParams.ProductId)
                        {
                            var product = _context.Products.FirstOrDefault(x => x.Id == productParams.ProductId);
                            item.ProductName = product.ProductName;
                            list.Add(item);
                        }
                    }
                    var productItems = Pagination<Items>.ToPageList(list.OrderBy(ob => ob.Id), productParams.PageNumber, productParams.PageSize);
                    var metadata = new
                    {
                        productItems.PageSize,
                        productItems.PageCount,
                        productItems.PageIndex,
                        productItems.PreviousPage,
                        productItems.NextPage,
                        productItems.TotalPages
                    };

                    var searchData = list.Where(x => x.ItemName.ToLower().StartsWith(productParams.SearchTerm) ||
                    x.ItemDescription.ToLower().StartsWith(productParams.SearchTerm)).ToList();

                    return new PaginatedProducts
                    {
                        PaginationDetails = metadata,
                        Items = searchData
                    };
                }
                else
                {

                    foreach (var item in _context.Items.ToList())
                    {
                        if ( item.ProductId == productParams.ProductId)
                        {
                            var product = _context.Products.FirstOrDefault(x => x.Id == productParams.ProductId);
                            item.ProductName = product.ProductName;
                            list.Add(item);
                        }

                    }
                    var productItems = Pagination<Items>.ToPageList(list.OrderBy(ob => ob.Id), productParams.PageNumber, productParams.PageSize);
                    var metadata = new
                    {
                        productItems.PageSize,
                        productItems.PageCount,
                        productItems.PageIndex,
                        productItems.PreviousPage,
                        productItems.NextPage,
                        productItems.TotalPages
                    };

                    return new PaginatedProducts
                    {
                        PaginationDetails = metadata,
                        Items = productItems
                    };
                }

            }
        }
            public async Task<Items> UpdateItem(int id, Items items)
        {
            if (items.file != null)
            {
                DeleteImage(items.file.FileName);
                string localPath = await UploadImage(items.file);
            }
            if (id == items.Id)
            {
                items.ItemImage = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}{_httpContextAccessor.HttpContext.Request.PathBase}/Utility/Images/{items.ItemName + ".jpg"}";
                _context.Entry(items).State = EntityState.Modified;

            }
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return items;
        }

        public async Task<StatusResponse> DeleteItem(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item != null)
            {
                if (item.ItemImage != null)
                {
                    var imageName = item.ItemImage.Split('/').Last();
                    DeleteImage(imageName);
                }
                _context.Items.Remove(item);
                await _context.SaveChangesAsync();
            }
            else
            {
                return new StatusResponse()
                {
                    StatusCode = 500,
                    StatusMessage = "Cannot Delete"

                };
            }
            return new StatusResponse()
            {
                StatusCode = 200,
                StatusMessage = "Deleted successfully"

            };
        }
    }
}

