﻿namespace TutorWeb.Models
{
    public class UserCredentials
    {
        public string Login { get; set; }
        public bool IsAdmin { get; set; }
        public DateTime Expiration { get; set; }
    }
}
