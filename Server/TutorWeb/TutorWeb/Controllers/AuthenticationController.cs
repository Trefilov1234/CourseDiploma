using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using System;
using TutorWeb.Data;
using TutorWeb.Models;
using TutorWeb.Services;

namespace TutorWeb.Controllers
{
    [ApiController]
    public class AuthenticationController:ControllerBase
    {
        public AuthenticationController(TutorContext context, IUserManager userManager)
        {
            _context = context;
            this.userManager = userManager;
        }

        private readonly TutorContext _context;
        private readonly IUserManager userManager;

        [HttpPost("tutorWebApi/registration")]
        public async Task<ActionResult<User>> Registration(User user)
        {
            var res = await userManager.Register(user);
            if (res.Message.Equals("ok"))
            {
                return CreatedAtAction(nameof(Registration), new { id = res.User.Id }, res.User);
            }
            else
            {
                return Conflict(new { Error=res.Message});
            }
        }

        [HttpPost("tutorWebApi/login")]
        public IActionResult Login(LoginParams loginParams)
        {
            var res = userManager.Login(loginParams.Login, loginParams.Password);
            
            if(res.Equals("user not found"))
            {
                return BadRequest();
            } 
            else if(res.Equals("ban"))
            {
                Console.WriteLine("yaaaaa");
                return NotFound();
            }
            return Ok();
        }
        [HttpPost("tutorWebApi/logout")]
        public IActionResult Logout()
        {

            if (userManager.CurrentUser == null)
            {
                return Unauthorized();
            }
            userManager.Logout();
            return Ok();
        }
        [HttpPost("tutorWebApi/banOrUnbanUserById/{id}")]
        public async Task<IActionResult> BanOrUnbanUserById(int id)
        {
            if (userManager.CurrentUser == null)
            {
                return Unauthorized();
            }
            var user = await _context.Users.Where(x => x.Id.Equals(id)).FirstAsync();
            if(user.IsBanned)
            {
                user.IsBanned = false;
            }
            else
            {
                user.IsBanned = true;
            }
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
