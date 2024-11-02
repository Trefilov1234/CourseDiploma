using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32;
using TutorWeb.Data;
using TutorWeb.Models;
using TutorWeb.Services;

namespace TutorWeb.Controllers
{
    [ApiController]
    public class UserController: ControllerBase
    {
        private readonly TutorContext _context;
        private readonly IUserManager userManager;

        public UserController(TutorContext context,IUserManager userManager)
        {
            _context = context;
            this.userManager = userManager;
        }

        // GET: api/users
        /*[HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }*/

        [HttpGet("tutorWebApi/getUser/{login}")]
        public async Task<ActionResult<User>> GetUser(string login)
        {
            Console.Write(login);
            var user = await _context.Users.Where(x => x.Login.Equals(login)).FirstAsync();

            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpGet("tutorWebApi/getUserCredentials")]
        public IActionResult GetUserCredentials()
        {
            return Ok(userManager.CurrentUser);
        }

        [HttpPost("tutorWebApi/changeUser")]
        public async Task<IActionResult> PutUser(ChangeUserParams changeUserParams)
        {
            if(userManager.CurrentUser==null)
            {
                return Unauthorized();
            }
            var res = await userManager.ChangeUser(changeUserParams);
            if (res.Message.Equals("ok"))
            {
                return Ok(res.User);
            }
            else
            {
                return Conflict(new { Error = res.Message });
            }
        }

        // DELETE: api/users/5
        /*[HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(string login)
        {
            return _context.Users.Any(e => e.Login == login);
        }*/
    }
}
