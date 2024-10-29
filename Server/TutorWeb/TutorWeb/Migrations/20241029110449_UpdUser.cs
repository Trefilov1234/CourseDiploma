using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TutorWeb.Migrations
{
    /// <inheritdoc />
    public partial class UpdUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "login",
                table: "users",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "password",
                table: "users",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "login",
                table: "users");

            migrationBuilder.DropColumn(
                name: "password",
                table: "users");
        }
    }
}
