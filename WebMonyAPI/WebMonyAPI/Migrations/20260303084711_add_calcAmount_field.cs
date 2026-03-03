using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebMonyAPI.Migrations
{
    /// <inheritdoc />
    public partial class add_calcAmount_field : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Amount",
                table: "tbl_operations",
                newName: "InitAmount");

            migrationBuilder.AddColumn<decimal>(
                name: "CalcAmount",
                table: "tbl_operations",
                type: "numeric(18,2)",
                precision: 18,
                scale: 2,
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CalcAmount",
                table: "tbl_operations");

            migrationBuilder.RenameColumn(
                name: "InitAmount",
                table: "tbl_operations",
                newName: "Amount");
        }
    }
}
