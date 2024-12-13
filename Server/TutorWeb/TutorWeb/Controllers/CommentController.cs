using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TutorWeb.Data;
using TutorWeb.Helpers;
using TutorWeb.Models;
using TutorWeb.Services;

namespace TutorWeb.Controllers
{
    [ApiController]
    public class CommentController: ControllerBase
    {
        private readonly TutorContext _tutorContext;
        private readonly IUserManager userManager;
        public CommentController(TutorContext tutorContext, IUserManager userManager)
        {
            _tutorContext = tutorContext;
            this.userManager = userManager;
        }
        [HttpPost("tutorWebApi/createComment/{tutorInfoId}")]
        public async Task<IActionResult> CreateComment(int tutorInfoId)
        {
            if (userManager.CurrentUser == null)
            {
                return Unauthorized();
            }
            if (userManager.CurrentUser.IsBanned)
            {
                return NotFound();
            }
            var form = await Request.ReadFormAsync();
            var value1 = form["description"];
            var comments= await _tutorContext.Comments.ToListAsync();
            var user = await _tutorContext.Users.Where(x => x.Login.Equals(userManager.CurrentUser.Login)).FirstAsync();
            var comment=new Comment {Description= value1,TutorInfoId= tutorInfoId, UserId= user.Id };
            await _tutorContext.Comments.AddAsync(comment);
            await _tutorContext.SaveChangesAsync();
            return Ok();
        }
        [HttpPost("tutorWebApi/deleteComment/{commentId}")]
        public async Task<IActionResult> DeleteComment(int commentId)
        {
            if (userManager.CurrentUser == null)
            {
                return Unauthorized();
            }
            if (userManager.CurrentUser.IsBanned)
            {
                return NotFound();
            }
            var comment=await _tutorContext.Comments.Where(x=>x.Id == commentId).FirstAsync();
            _tutorContext.Comments.Remove(comment);
            await _tutorContext.SaveChangesAsync();
            return Ok();
        }
        [HttpGet("tutorWebApi/getCommentsByTutorInfoId/{tutorInfoId}")]
        public async Task<IActionResult> GetCommentsByTutorInfoId(int tutorInfoId)
        {
            if (userManager.CurrentUser == null)
            {
                return Unauthorized();
            }
            if (userManager.CurrentUser.IsBanned)
            {
                return NotFound();
            }
            var commentss = await _tutorContext.Comments.Where(x => x.TutorInfoId == tutorInfoId).Select(t =>  new
            {
                desc = t.Description,
                firstName = _tutorContext.Users.Where(x => x.Id.Equals(t.UserId)).First().Firstname,
                lastName = _tutorContext.Users.Where(x => x.Id.Equals(t.UserId)).First().Lastname,
                login= _tutorContext.Users.Where(x => x.Id.Equals(t.UserId)).First().Login,
                id=t.Id
            }
            ).ToListAsync();
            

            return Ok( new { comments = commentss });
        }
    }
}
