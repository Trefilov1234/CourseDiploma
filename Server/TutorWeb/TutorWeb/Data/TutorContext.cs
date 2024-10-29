using Microsoft.EntityFrameworkCore;
using TutorWeb.Models;

namespace TutorWeb.Data
{
    public class TutorContext: DbContext
    {
        public TutorContext(DbContextOptions<TutorContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
    }
}
