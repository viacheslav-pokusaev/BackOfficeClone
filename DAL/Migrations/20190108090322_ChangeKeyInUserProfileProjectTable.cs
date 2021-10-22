using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Application.DAL.Migrations
{
    public partial class ChangeKeyInUserProfileProjectTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserProfileProjects",
                table: "UserProfileProjects");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "UserProfileProjects",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserProfileProjects",
                table: "UserProfileProjects",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_UserProfileProjects_UserProfileId",
                table: "UserProfileProjects",
                column: "UserProfileId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserProfileProjects",
                table: "UserProfileProjects");

            migrationBuilder.DropIndex(
                name: "IX_UserProfileProjects_UserProfileId",
                table: "UserProfileProjects");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "UserProfileProjects");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserProfileProjects",
                table: "UserProfileProjects",
                columns: new[] { "UserProfileId", "ProjectId" });
        }
    }
}
