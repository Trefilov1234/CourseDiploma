
using Microsoft.EntityFrameworkCore;
using TutorWeb.Data;
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
                /*options.AddDefaultPolicy(builder =>
                {
                    builder.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });*/
                options.AddPolicy(name: policyName, builder =>
                {
                    builder.WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod().AllowCredentials();
                });
            });
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
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

            app.UseHttpsRedirection();
            app.UseCors(policyName);

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
