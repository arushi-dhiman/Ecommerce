using EcommerceApplication.Models;

namespace MedicineApplication.Models
{
    public class Response
    {
        public StatusResponse? Status { get; set; }
        public List<Users>? UserList { get; set; }
        public Users? User { get; set; }


    }
}
