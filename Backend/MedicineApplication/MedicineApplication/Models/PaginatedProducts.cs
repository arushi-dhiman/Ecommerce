namespace EcommerceApplication.Models
{
    public class PaginatedProducts
    {
        public object? PaginationDetails { get; set; }
        public List<Products>? Products { get; set; }
        public List<Items>? Items { get; set; }
    }
}
