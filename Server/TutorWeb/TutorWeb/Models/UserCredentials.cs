

namespace TutorWeb.Models
{
    public class UserCredentials
    {
        public string Login { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsBanned { get; set; }
        public DateTime Expiration { get; set; }
    }
}
