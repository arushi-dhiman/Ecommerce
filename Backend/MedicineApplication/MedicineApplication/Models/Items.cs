using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcommerceApplication.Models
{
    public class Items
    {
        [Key]
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string? ItemName { get; set; }
        public string? ItemDescription { get; set; }
        public string? ItemImage { get; set; }
        public double Price { get; set; }
        public double Discount { get; set; }
        [NotMapped]
        public IFormFile? file { get; set; }
        [NotMapped]
        public string? ProductName { get; set; }

    }
}
