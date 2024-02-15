using EcommerceApplication.Paginate;
using MedicineApplication.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcommerceApplication.Models
{
    public class Products
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("CategoryId")]
        public int CategoryId { get; set; }
        public string? ProductName { get; set; }
        public string? ProductDescription { get; set; }
        public string? ProductImage { get; set; }

        [NotMapped]
        public string? CategoryName { get; set; }
        [NotMapped]
        public IFormFile? file { get; set; }

    }
}
