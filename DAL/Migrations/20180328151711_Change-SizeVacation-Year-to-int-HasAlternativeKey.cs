using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Application.DAL.Migrations
{
    public partial class ChangeSizeVacationYeartointHasAlternativeKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Year",
                table: "SizeVacations"
                );

            migrationBuilder.AddColumn<int>(
                name: "Year",
                table: "SizeVacations",
                nullable: false
                );

            migrationBuilder.AddUniqueConstraint(
                name: "AK_SizeVacations_Year",
                table: "SizeVacations",
                column: "Year");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropUniqueConstraint(
                name: "AK_SizeVacations_Year",
                table: "SizeVacations");

            migrationBuilder.DropColumn(
                name: "Year",
                table: "SizeVacations"
                );

            migrationBuilder.AddColumn<DateTime>(
                name: "Year",
                table: "SizeVacations",
                nullable: false,
                defaultValue: new DateTime(2018, 3, 28, 16, 21, 40, 201, DateTimeKind.Local)
                );
        }
    }
}
