using Microsoft.EntityFrameworkCore;
using TutorWeb.Data;
using TutorWeb.Models;

namespace TutorWeb.Services
{
    public class UserManager:IUserManager
    {
        private readonly TutorContext tutorContext;

        public UserManager(TutorContext tutorContext)
        {
            this.tutorContext = tutorContext;
        }

        public bool Login(string userName, string password)
        {
            throw new NotImplementedException();
        }

        public async Task<User> Register(User user)
        {
            int userId = tutorContext.Users.Count()+1;
            var passwordHash = SHA256Encrypter.Encript(user.Password);
            user.Id = userId;
            user.Password = passwordHash;
            tutorContext.Users.Add(user);
            await tutorContext.SaveChangesAsync();
            return user;
        }
    }
}
