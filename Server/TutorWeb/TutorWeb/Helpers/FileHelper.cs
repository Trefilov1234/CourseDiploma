using TutorWeb.Models;

namespace TutorWeb.Helpers
{
    public static class FileHelper
    {
        public static string ImageToBase64String(string filePath)
        {
            if (String.IsNullOrEmpty(filePath))
            {
                return "";
            }
            else
            {
               var bytes=File.ReadAllBytes(filePath);
                return Convert.ToBase64String(bytes, 0, bytes.Length);
            }
        }
    }
}
