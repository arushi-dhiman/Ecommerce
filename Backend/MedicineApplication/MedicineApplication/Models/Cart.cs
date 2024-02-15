using System.ComponentModel.DataAnnotations.Schema;

namespace EcommerceApplication.Models
{
    public class Cart
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public int ItemId { get; set; }
        public double Price { get; set; }
        public double DiscountPrice { get; set; }
        public int Quantity { get; set; }

        [NotMapped]
        public string? ItemName { get; set; }
        [NotMapped]
        public string? ItemImage { get; set;}

    }
}
