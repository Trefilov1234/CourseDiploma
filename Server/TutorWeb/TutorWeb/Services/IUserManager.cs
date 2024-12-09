using TutorWeb.Models;

namespace TutorWeb.Services
{
    public interface IUserManager
    {
        string Login(string login, string password);

        Task<(string Message, User User)> Register(User user);
        UserCredentials CurrentUser { get; set; }
        Task<UserCredentials> GetUserCredentials();
        Task<(string Message, User User)> ChangeUser(ChangeUserParams changeUserParams);
        void Logout();
    }
}
