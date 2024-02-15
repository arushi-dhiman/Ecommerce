namespace EcommerceApplication.Paginate
{
    public class ProductParams
    {
        const int maxSize = 50;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = maxSize;
        public string? SearchTerm { get; set; }

        public int PageSize { get { return _pageSize; } set { _pageSize = (value > maxSize) ? maxSize : value; } }
        public int CategoryId { get; set; }
        public int ProductId { get; set; }

    }
}
