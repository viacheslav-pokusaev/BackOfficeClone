using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Application.DAL.Migrations
{
    public partial class SickDayandVacation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UsersProfile_AspNetUsers_ApplicationUserId",
                table: "UsersProfile");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UsersProfile",
                table: "UsersProfile");

            migrationBuilder.DropPrimaryKey(
                name: "PK_sickDays",
                table: "sickDays");

            migrationBuilder.DropColumn(
                name: "ConfirmPassword",
                table: "RequestToCreateUsers");

            migrationBuilder.RenameTable(
                name: "UsersProfile",
                newName: "UsersProfiles");

            migrationBuilder.RenameTable(
                name: "sickDays",
                newName: "SickDays");

            migrationBuilder.RenameIndex(
                name: "IX_UsersProfile_ApplicationUserId",
                table: "UsersProfiles",
                newName: "IX_UsersProfiles_ApplicationUserId");

            migrationBuilder.AlterColumn<string>(
                name: "Comment",
                table: "Vacations",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 1000,
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserProfileId",
                table: "Vacations",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Comment",
                table: "UsersProfiles",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 1000,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Comment",
                table: "SickDays",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 1000,
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserProfileId",
                table: "SickDays",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "RequestToCreateUsers",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                table: "RequestToCreateUsers",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UsersProfiles",
                table: "UsersProfiles",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SickDays",
                table: "SickDays",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Vacations_UserProfileId",
                table: "Vacations",
                column: "UserProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_SickDays_UserProfileId",
                table: "SickDays",
                column: "UserProfileId");

            migrationBuilder.AddForeignKey(
                name: "FK_SickDays_UsersProfiles_UserProfileId",
                table: "SickDays",
                column: "UserProfileId",
                principalTable: "UsersProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UsersProfiles_AspNetUsers_ApplicationUserId",
                table: "UsersProfiles",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Vacations_UsersProfiles_UserProfileId",
                table: "Vacations",
                column: "UserProfileId",
                principalTable: "UsersProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SickDays_UsersProfiles_UserProfileId",
                table: "SickDays");

            migrationBuilder.DropForeignKey(
                name: "FK_UsersProfiles_AspNetUsers_ApplicationUserId",
                table: "UsersProfiles");

            migrationBuilder.DropForeignKey(
                name: "FK_Vacations_UsersProfiles_UserProfileId",
                table: "Vacations");

            migrationBuilder.DropIndex(
                name: "IX_Vacations_UserProfileId",
                table: "Vacations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UsersProfiles",
                table: "UsersProfiles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SickDays",
                table: "SickDays");

            migrationBuilder.DropIndex(
                name: "IX_SickDays_UserProfileId",
                table: "SickDays");

            migrationBuilder.DropColumn(
                name: "UserProfileId",
                table: "Vacations");

            migrationBuilder.DropColumn(
                name: "UserProfileId",
                table: "SickDays");

            migrationBuilder.RenameTable(
                name: "UsersProfiles",
                newName: "UsersProfile");

            migrationBuilder.RenameTable(
                name: "SickDays",
                newName: "sickDays");

            migrationBuilder.RenameIndex(
                name: "IX_UsersProfiles_ApplicationUserId",
                table: "UsersProfile",
                newName: "IX_UsersProfile_ApplicationUserId");

            migrationBuilder.AlterColumn<string>(
                name: "Comment",
                table: "Vacations",
                maxLength: 1000,
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Comment",
                table: "UsersProfile",
                maxLength: 1000,
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Comment",
                table: "sickDays",
                maxLength: 1000,
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "RequestToCreateUsers",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                table: "RequestToCreateUsers",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<string>(
                name: "ConfirmPassword",
                table: "RequestToCreateUsers",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UsersProfile",
                table: "UsersProfile",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_sickDays",
                table: "sickDays",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UsersProfile_AspNetUsers_ApplicationUserId",
                table: "UsersProfile",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
