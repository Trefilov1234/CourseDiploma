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
            Console.WriteLine("qq");
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
            if(userManager.Login(loginParams.Login, loginParams.Password))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            } 
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
    }
}
