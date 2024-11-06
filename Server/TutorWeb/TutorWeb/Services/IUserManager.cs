using TutorWeb.Models;

namespace TutorWeb.Services
{
    public interface IUserManager
    {
        bool Login(string login, string password);

        Task<(string Message, User User)> Register(User user);
        UserCredentials CurrentUser { get; set; }
        UserCredentials GetUserCrededantials();
        Task<(string Message, User User)> ChangeUser(ChangeUserParams changeUserParams);
        void Logout();
    }
}
