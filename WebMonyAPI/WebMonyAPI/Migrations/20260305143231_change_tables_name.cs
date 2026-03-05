using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebMonyAPI.Migrations
{
    /// <inheritdoc />
    public partial class change_tables_name : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_AspNetUsers_UserId",
                table: "Categories");

            migrationBuilder.DropForeignKey(
                name: "FK_Categories_tblCategoryTypes_CategoryTypeId",
                table: "Categories");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_operations_Categories_CategoryId",
                table: "tbl_operations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tblCategoryTypes",
                table: "tblCategoryTypes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Categories",
                table: "Categories");

            migrationBuilder.RenameTable(
                name: "tblCategoryTypes",
                newName: "tbl_category_types");

            migrationBuilder.RenameTable(
                name: "Categories",
                newName: "tbl_categories");

            migrationBuilder.RenameIndex(
                name: "IX_Categories_UserId",
                table: "tbl_categories",
                newName: "IX_tbl_categories_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Categories_CategoryTypeId",
                table: "tbl_categories",
                newName: "IX_tbl_categories_CategoryTypeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tbl_category_types",
                table: "tbl_category_types",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tbl_categories",
                table: "tbl_categories",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_categories_AspNetUsers_UserId",
                table: "tbl_categories",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_categories_tbl_category_types_CategoryTypeId",
                table: "tbl_categories",
                column: "CategoryTypeId",
                principalTable: "tbl_category_types",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_operations_tbl_categories_CategoryId",
                table: "tbl_operations",
                column: "CategoryId",
                principalTable: "tbl_categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_categories_AspNetUsers_UserId",
                table: "tbl_categories");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_categories_tbl_category_types_CategoryTypeId",
                table: "tbl_categories");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_operations_tbl_categories_CategoryId",
                table: "tbl_operations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tbl_category_types",
                table: "tbl_category_types");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tbl_categories",
                table: "tbl_categories");

            migrationBuilder.RenameTable(
                name: "tbl_category_types",
                newName: "tblCategoryTypes");

            migrationBuilder.RenameTable(
                name: "tbl_categories",
                newName: "Categories");

            migrationBuilder.RenameIndex(
                name: "IX_tbl_categories_UserId",
                table: "Categories",
                newName: "IX_Categories_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_tbl_categories_CategoryTypeId",
                table: "Categories",
                newName: "IX_Categories_CategoryTypeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tblCategoryTypes",
                table: "tblCategoryTypes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Categories",
                table: "Categories",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_AspNetUsers_UserId",
                table: "Categories",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_tblCategoryTypes_CategoryTypeId",
                table: "Categories",
                column: "CategoryTypeId",
                principalTable: "tblCategoryTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_operations_Categories_CategoryId",
                table: "tbl_operations",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
