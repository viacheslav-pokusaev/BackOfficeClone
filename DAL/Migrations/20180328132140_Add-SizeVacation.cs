using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Application.DAL.Migrations
{
    public partial class AddSizeVacation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SizeVacations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CountDay = table.Column<int>(nullable: false, defaultValue: 0),
                    Year = table.Column<DateTime>(nullable: false, defaultValue: new DateTime(2018, 3, 28, 16, 21, 40, 201, DateTimeKind.Local))
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SizeVacations", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SizeVacations");
        }
    }
}
