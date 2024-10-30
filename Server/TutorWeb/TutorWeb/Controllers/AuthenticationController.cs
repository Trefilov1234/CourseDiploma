using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
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
            await userManager.Register(user);
            return CreatedAtAction(nameof(Registration),new{ id=user.Id },user);
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
    }
}
