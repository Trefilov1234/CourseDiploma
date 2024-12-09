using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
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
        public UserCredentials CurrentUser { get; set; }
        public UserManager(TutorContext tutorContext, IHttpContextAccessor httpContextAccessor)
        {
            this.tutorContext = tutorContext;
            this.httpContextAccessor = httpContextAccessor;
        }

        public string Login(string login, string password)
        {
            var passwordHash = SHA256Encrypter.Encript(password);

            var user = tutorContext.Users.FirstOrDefault(u => u.Login == login && u.Password == passwordHash);
            if (user == null) { Console.WriteLine("null"); };
           
            if (user != null)
            {
                if (user.IsBanned)
                {
                    return "ban";
                }
                //  HttpContext.Response.Cookies.Append("auth", loginView.Login);
                UserCredentials userCredentials = new UserCredentials()
                {
                    Login = user.Login,
                    IsAdmin = user.IsAdmin,
                    IsBanned= user.IsBanned,
                    Firstname=user.Firstname,
                    Lastname=user.Lastname,
                    Expiration= DateTime.Now + TimeSpan.FromHours(1)
                };
                var userCred = JsonSerializer.Serialize(userCredentials);
                var hash = AesOperation.EncryptString("b14ca5898a4e4133bbce2ea2315a1916", userCred);
                httpContextAccessor.HttpContext.Response.Cookies.Append("auth", hash,new CookieOptions() { Expires= DateTime.Now + TimeSpan.FromHours(1) });
                return "ok";

            }
            return "user not found";
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
        public async Task<UserCredentials> GetUserCredentials()
        {

            try
            {
                if (httpContextAccessor.HttpContext.Request.Cookies.ContainsKey("auth"))
                {
                    var hash = httpContextAccessor.HttpContext.Request.Cookies["auth"];
                    var json = AesOperation.DecryptString("b14ca5898a4e4133bbce2ea2315a1916", hash);
                    CurrentUser = JsonSerializer.Deserialize<UserCredentials>(json);
                    Console.WriteLine(CurrentUser.Login);
                    var isBanned = await tutorContext.Users.Where(x => x.Login.Equals(CurrentUser.Login)).FirstOrDefaultAsync();
                    CurrentUser.IsBanned = isBanned.IsBanned;
                    return CurrentUser;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            httpContextAccessor.HttpContext.Response.Cookies.Append("auth", "", new CookieOptions() { Expires = DateTime.Now + TimeSpan.FromDays(-1) });
            return null;
        }

        public async Task<(string Message, User User)> ChangeUser(ChangeUserParams changeUserParams)
        {
            var curUser = await tutorContext.Users.Where(x => x.Login.Equals(CurrentUser.Login)).FirstAsync();
            if (tutorContext.Users.Where(x => x.Login.Equals(changeUserParams.Login)).FirstOrDefault() != null&& curUser.Login != changeUserParams.Login)
            {
                return ("login already exists", null);
            }
            else if (tutorContext.Users.Where(x => x.Email.Equals(changeUserParams.Email)).FirstOrDefault() != null&& curUser.Email != changeUserParams.Email)
            {
                return ("email already exists", null);
            }
            else
            {
                UserCredentials userCredentials = new UserCredentials()
                {
                    Login = changeUserParams.Login,
                    IsAdmin = CurrentUser.IsAdmin,
                    Firstname = changeUserParams.Firstname,
                    Lastname = changeUserParams.Lastname,
                    Expiration = CurrentUser.Expiration,
                };
                var userCred = JsonSerializer.Serialize(userCredentials);
                var hash = AesOperation.EncryptString("b14ca5898a4e4133bbce2ea2315a1916", userCred);
                curUser.Login = changeUserParams.Login;
                curUser.Email = changeUserParams.Email;
                curUser.Firstname = changeUserParams.Firstname;
                curUser.Lastname = changeUserParams.Lastname;
                if (!String.IsNullOrEmpty(changeUserParams.Password))
                {
                    curUser.Password = SHA256Encrypter.Encript(changeUserParams.Password);
                }

                tutorContext.Users.Update(curUser);
                await tutorContext.SaveChangesAsync();
                httpContextAccessor.HttpContext.Response.Cookies.Append("auth", hash, new CookieOptions() { Expires = CurrentUser.Expiration });
                return ("ok",curUser);
            }
            
            
        }
        public void Logout()
        {
            UserCredentials userCredentials = new UserCredentials()
            {
                Login = CurrentUser.Login,
                IsAdmin = CurrentUser.IsAdmin,
                Firstname = CurrentUser.Firstname,
                Lastname = CurrentUser.Lastname,
                Expiration = DateTime.Now + TimeSpan.FromDays(-1)
            };
            var userCred = JsonSerializer.Serialize(userCredentials);
            var hash = AesOperation.EncryptString("b14ca5898a4e4133bbce2ea2315a1916", userCred);
            httpContextAccessor.HttpContext.Response.Cookies.Append("auth", hash, new CookieOptions() { Expires = DateTime.Now + TimeSpan.FromDays(-1) });
        }

    }
}
