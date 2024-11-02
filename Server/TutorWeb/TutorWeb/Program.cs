
using Microsoft.EntityFrameworkCore;
using TutorWeb.Data;
using TutorWeb.Middlewares;
using TutorWeb.Services;
namespace TutorWeb
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            var policyName = "policyName1";
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: policyName, builder =>
                {
                    builder.WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod().AllowCredentials();
                });
            });
            builder.Services.AddControllers();
            
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddSingleton<IHttpContextAccessor,
                        HttpContextAccessor>();
            var configuration = builder.Configuration;
            builder.Services.AddDbContext<TutorContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));
            builder.Services.AddScoped<IUserManager, UserManager>();
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseMiddleware<AuthMiddleware>();
            app.UseHttpsRedirection();
            app.UseCors(policyName);

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
