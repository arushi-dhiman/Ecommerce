namespace MedicineApplication.Models
{
    public class FileUpload
    {
        public string? FileName { get; set; }
        public string? FileDescription { get; set; }
        public int CategoryId { get; set; }
        public IFormFile? file { get; set; }
        public int ProductId { get; set; }
        public double Price { get; set; }
        public double Discount { get; set; }

    }
}
