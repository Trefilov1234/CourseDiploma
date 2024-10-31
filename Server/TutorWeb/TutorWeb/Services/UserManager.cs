using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using TutorWeb.Data;
using TutorWeb.Models;

namespace TutorWeb.Services
{
    public class UserManager:IUserManager
    {
        private readonly TutorContext tutorContext;
        private readonly IHttpContextAccessor httpContextAccessor;

        public UserManager(TutorContext tutorContext, IHttpContextAccessor httpContextAccessor)
        {
            this.tutorContext = tutorContext;
            this.httpContextAccessor = httpContextAccessor;
        }

        public bool Login(string login, string password)
        {
            var passwordHash = SHA256Encrypter.Encript(password);

            var user = tutorContext.Users.FirstOrDefault(u => u.Login == login && u.Password == passwordHash);
            if (user != null)
            {
                //  HttpContext.Response.Cookies.Append("auth", loginView.Login);
                UserCredentials userCredentials = new UserCredentials()
                {
                    Login = user.Login,
                    IsAdmin = user.IsAdmin,
                    Expiration = DateTime.Now + TimeSpan.FromMinutes(1)

                };
                var userCred = JsonSerializer.Serialize(userCredentials);
                var hash = AesOperation.EncryptString("b14ca5898a4e4133bbce2ea2315a1916", userCred);// шифруем куки
                httpContextAccessor.HttpContext.Response.Cookies.Append("auth", hash);
                return true;

            }
            return false;
        }

        public async Task<(string Message,User User)> Register(User user)
        {
            if (tutorContext.Users.Where(x=>x.Login.Equals(user.Login)).FirstOrDefault()!=null)
            {
                return ("login already exists",null);
            }
            else if (tutorContext.Users.Where(x => x.Email.Equals(user.Email)).FirstOrDefault() != null)
            {
                return ("email already exists", null);
            }
            else
            {
                int userId = tutorContext.Users.Count() + 1;
                var passwordHash = SHA256Encrypter.Encript(user.Password);
                user.Id = userId;
                user.Password = passwordHash;
                tutorContext.Users.Add(user);
                await tutorContext.SaveChangesAsync();
                return ("ok",user);
            }
        }

    }
}
