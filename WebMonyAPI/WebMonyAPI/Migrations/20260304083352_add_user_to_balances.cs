using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebMonyAPI.Migrations
{
    /// <inheritdoc />
    public partial class add_user_to_balances : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "UserId",
                table: "tbl_balances",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_tbl_balances_UserId",
                table: "tbl_balances",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_balances_AspNetUsers_UserId",
                table: "tbl_balances",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_balances_AspNetUsers_UserId",
                table: "tbl_balances");

            migrationBuilder.DropIndex(
                name: "IX_tbl_balances_UserId",
                table: "tbl_balances");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "tbl_balances");
        }
    }
}
