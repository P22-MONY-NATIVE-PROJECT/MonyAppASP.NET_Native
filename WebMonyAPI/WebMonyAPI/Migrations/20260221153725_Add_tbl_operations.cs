using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace WebMonyAPI.Migrations
{
    /// <inheritdoc />
    public partial class Add_tbl_operations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tbl_expense_operations",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ExpenseCategoryId = table.Column<long>(type: "bigint", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric", nullable: false),
                    Comment = table.Column<string>(type: "text", nullable: true),
                    BalanceId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_expense_operations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tbl_expense_operations_tbl_balances_BalanceId",
                        column: x => x.BalanceId,
                        principalTable: "tbl_balances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tbl_expense_operations_tbl_expense_category_ExpenseCategory~",
                        column: x => x.ExpenseCategoryId,
                        principalTable: "tbl_expense_category",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tbl_income_operations",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IncomeCategoryId = table.Column<long>(type: "bigint", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric", nullable: false),
                    Comment = table.Column<string>(type: "text", nullable: true),
                    BalanceId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_income_operations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tbl_income_operations_tbl_balances_BalanceId",
                        column: x => x.BalanceId,
                        principalTable: "tbl_balances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tbl_income_operations_tbl_income_category_IncomeCategoryId",
                        column: x => x.IncomeCategoryId,
                        principalTable: "tbl_income_category",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tbl_expense_operation_charges",
                columns: table => new
                {
                    OperationId = table.Column<long>(type: "bigint", nullable: false),
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Percentage = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: true),
                    Amount = table.Column<decimal>(type: "numeric(18,4)", precision: 18, scale: 4, nullable: true),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    ApplicationType = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_expense_operation_charges", x => new { x.OperationId, x.Id });
                    table.ForeignKey(
                        name: "FK_tbl_expense_operation_charges_tbl_expense_operations_Operat~",
                        column: x => x.OperationId,
                        principalTable: "tbl_expense_operations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tbl_income_operation_charges",
                columns: table => new
                {
                    OperationId = table.Column<long>(type: "bigint", nullable: false),
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Percentage = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: true),
                    Amount = table.Column<decimal>(type: "numeric(18,4)", precision: 18, scale: 4, nullable: true),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    ApplicationType = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_income_operation_charges", x => new { x.OperationId, x.Id });
                    table.ForeignKey(
                        name: "FK_tbl_income_operation_charges_tbl_income_operations_Operatio~",
                        column: x => x.OperationId,
                        principalTable: "tbl_income_operations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tbl_expense_operations_BalanceId",
                table: "tbl_expense_operations",
                column: "BalanceId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_expense_operations_ExpenseCategoryId",
                table: "tbl_expense_operations",
                column: "ExpenseCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_income_operations_BalanceId",
                table: "tbl_income_operations",
                column: "BalanceId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_income_operations_IncomeCategoryId",
                table: "tbl_income_operations",
                column: "IncomeCategoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tbl_expense_operation_charges");

            migrationBuilder.DropTable(
                name: "tbl_income_operation_charges");

            migrationBuilder.DropTable(
                name: "tbl_expense_operations");

            migrationBuilder.DropTable(
                name: "tbl_income_operations");
        }
    }
}
