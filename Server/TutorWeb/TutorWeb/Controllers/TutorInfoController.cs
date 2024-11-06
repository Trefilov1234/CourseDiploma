using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting.Internal;
using System.IO;
using TutorWeb.Data;
using TutorWeb.Services;
using System.Web;
using TutorWeb.Models;
using Microsoft.AspNetCore.Identity;
namespace TutorWeb.Controllers
{
    [ApiController]
    public class TutorInfoController : ControllerBase
    {
        private readonly TutorContext _tutorContext;
        private readonly IUserManager userManager;
        private IWebHostEnvironment _hostingEnvironment;
        public TutorInfoController(TutorContext tutorContext, IUserManager userManager, IWebHostEnvironment hostingEnvironment)
        {
            _tutorContext = tutorContext;
            this.userManager = userManager;
            _hostingEnvironment = hostingEnvironment;
        }
        [HttpPost("tutorWebApi/createTutorInfo")]
        public async Task<IActionResult> CreateTutorInfo()
        {
            if (userManager.CurrentUser == null)
            {
                return Unauthorized();
            }
            var form = await Request.ReadFormAsync();
            var value1 = form["subject"];
            var value2 = form["description"];
            var file = Request.Form.Files.FirstOrDefault();
            string path;
            TutorInfo tutorInfo = new TutorInfo();
            if (file != null)
            {
                path = _hostingEnvironment.WebRootPath + "\\Images\\" + Guid.NewGuid() + file.FileName;
                using (var stream = System.IO.File.Create(path))
                {
                    await file.CopyToAsync(stream);
                    tutorInfo.ImagePath = path;
                }
            }
            
            Console.WriteLine(value1+value2);
            int tutorInfoId = _tutorContext.TutorInfos.Count() + 1;
            
            tutorInfo.Id=tutorInfoId;
            tutorInfo.Subject = value1.ToString();
            tutorInfo.Description = value2.ToString();
            
            var user = _tutorContext.Users.FirstOrDefault(u => u.Login.Equals(userManager.CurrentUser.Login));
            tutorInfo.UserId = user.Id;
            _tutorContext.TutorInfos.Add(tutorInfo);
            await _tutorContext.SaveChangesAsync();
            return Ok();
        }
       
    }
}
