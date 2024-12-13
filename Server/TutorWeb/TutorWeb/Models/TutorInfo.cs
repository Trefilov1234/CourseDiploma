using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TutorWeb.Models
{
    [Table("tutorInfos")]
    public class TutorInfo
    {
        [Required]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [Column("subject")]
        public string Subject { get; set; }

        [Required]
        [Column("description")]
        public string Description { get; set; }

        [Column("imagePath")]
        public string? ImagePath { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

        public IEnumerable<Comment>? Comments { get; set; }
    }
}
