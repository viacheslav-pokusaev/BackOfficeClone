using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Application.DAL.Migrations
{
    public partial class AddThreeColumnsToUserProfileTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Hobbies",
                table: "UsersProfiles",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ResidentialAddress",
                table: "UsersProfiles",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Skills",
                table: "UsersProfiles",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Hobbies",
                table: "UsersProfiles");

            migrationBuilder.DropColumn(
                name: "ResidentialAddress",
                table: "UsersProfiles");

            migrationBuilder.DropColumn(
                name: "Skills",
                table: "UsersProfiles");
        }
    }
}
