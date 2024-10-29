using System.Security.Cryptography;
using System.Text;

namespace TutorWeb.Services
{
    public class SHA256Encrypter
    {
        public static string Encript(string str)
        {
            using (SHA256 sha = SHA256.Create())
            {
                byte[] bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(str));
                StringBuilder stringBuilder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    stringBuilder.Append(bytes[i].ToString("x2"));
                }

                return stringBuilder.ToString();

            }
        }
    }
}
