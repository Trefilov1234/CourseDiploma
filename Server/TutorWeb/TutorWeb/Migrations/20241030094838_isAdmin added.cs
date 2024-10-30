using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TutorWeb.Migrations
{
    /// <inheritdoc />
    public partial class isAdminadded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isAdmin",
                table: "users",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isAdmin",
                table: "users");
        }
    }
}
