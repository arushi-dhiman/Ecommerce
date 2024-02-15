using EcommerceApplication.Migrations;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicineApplication.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public string?    CategoryName { get; set; }
        public string? CategoryDescription { get; set; }
        public string? CategoryImage { get; set; }

        [NotMapped]
        public IFormFile? file { get; set; }
       
    }
}
