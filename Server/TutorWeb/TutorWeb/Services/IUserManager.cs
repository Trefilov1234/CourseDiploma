using TutorWeb.Models;

namespace TutorWeb.Services
{
    public interface IUserManager
    {
        bool Login(string userName, string password);

        Task<User> Register(User user);
    }
}
