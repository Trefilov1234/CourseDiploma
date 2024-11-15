using TutorWeb.Services;

namespace TutorWeb.Middlewares
{
    public class AuthMiddleware
    {
        private RequestDelegate next;

        public AuthMiddleware(RequestDelegate next)
        {
            this.next = next;    
        }
        public async Task InvokeAsync(HttpContext context, IUserManager userManager)
        {
            userManager.GetUserCredentials();
            await next.Invoke(context);
        }
    }
}
