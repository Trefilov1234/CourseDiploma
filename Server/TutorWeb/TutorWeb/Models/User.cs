﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        [Column("lastame")]
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
    }
}
