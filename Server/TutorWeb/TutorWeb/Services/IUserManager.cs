using TutorWeb.Models;

namespace TutorWeb.Services
{
    public interface IUserManager
    {
        bool Login(string login, string password);

        Task<User> Register(User user);
    }
}
