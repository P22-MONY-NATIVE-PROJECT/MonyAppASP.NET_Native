using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebMonyAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddPushTokenToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PushToken",
                table: "AspNetUsers",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PushToken",
                table: "AspNetUsers");
        }
    }
}
