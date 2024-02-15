using System.ComponentModel.DataAnnotations;

namespace MedicineApplication.Models
{
    public class Users
    {
        [Key]
        public int ID { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public decimal Fund { get; set; }
        public string? Type { get; set; }
        public bool Status { get; set; }
        public DateTime CreatedOnDate { get; set; }
    }
}
