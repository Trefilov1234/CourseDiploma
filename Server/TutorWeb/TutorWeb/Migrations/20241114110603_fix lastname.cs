using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TutorWeb.Migrations
{
    /// <inheritdoc />
    public partial class fixlastname : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "lastame",
                table: "users",
                newName: "lastname");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "lastname",
                table: "users",
                newName: "lastame");
        }
    }
}
