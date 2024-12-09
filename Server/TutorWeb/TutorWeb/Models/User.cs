using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TutorWeb.Models
{
    [Table("users")]
    public class User
    {
        [Required]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [Column("firstname")]
        public string Firstname { get; set; }

        [Required]
        [Column("lastname")]
        public string Lastname { get; set; }

        [Required]
        [Column("email")]
        public string Email { get; set; }

        [Required]
        [Column("login")]
        public string Login { get; set; }

        [Required]
        [Column("password")]
        public string Password { get; set; }

        [Column("isAdmin")]
        public bool IsAdmin { get; set; }

        [Column("isBanned")]
        public bool IsBanned { get; set; }

        public IEnumerable<TutorInfo>? TutorInfos { get; set; }
    }
}
