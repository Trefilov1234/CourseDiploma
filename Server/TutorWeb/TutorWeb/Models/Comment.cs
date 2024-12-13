using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TutorWeb.Models
{
    [Table("comments")]
    public class Comment
    {

        [Required]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [Column("description")]
        public string Description { get; set; }

        public int TutorInfoId { get; set; }

        public TutorInfo TutorInfo { get; set; }

        public int UserId { get; set; }

    }
}
