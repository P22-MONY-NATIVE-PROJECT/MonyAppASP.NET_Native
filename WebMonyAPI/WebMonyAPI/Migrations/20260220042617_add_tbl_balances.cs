using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace WebMonyAPI.Migrations
{
    /// <inheritdoc />
    public partial class add_tbl_balances : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tbl_balances",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Icon = table.Column<string>(type: "text", nullable: true),
                    CurrencyId = table.Column<long>(type: "bigint", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric", nullable: false),
                    IsSaving = table.Column<bool>(type: "boolean", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_balances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tbl_balances_tbl_currencies_CurrencyId",
                        column: x => x.CurrencyId,
                        principalTable: "tbl_currencies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tbl_balances_CurrencyId",
                table: "tbl_balances",
                column: "CurrencyId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tbl_balances");
        }
    }
}
