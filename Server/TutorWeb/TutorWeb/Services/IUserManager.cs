using TutorWeb.Models;

namespace TutorWeb.Services
{
    public interface IUserManager
    {
        bool Login(string login, string password);

        Task<(string Message, User User)> Register(User user);
    }
}
