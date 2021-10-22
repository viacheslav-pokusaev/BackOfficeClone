using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Application.DAL.Migrations
{
    public partial class CreateTablesAuditTrailAuditTrailEntityAuditTrailValue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AuditTrails",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Date = table.Column<DateTime>(nullable: false),
                    UserName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditTrails", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AuditTrailEntities",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Action = table.Column<string>(nullable: true),
                    AuditTrailId = table.Column<int>(nullable: false),
                    EntityName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditTrailEntities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AuditTrailEntities_AuditTrails_AuditTrailId",
                        column: x => x.AuditTrailId,
                        principalTable: "AuditTrails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AuditTrailValues",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AuditTrailEntityId = table.Column<int>(nullable: false),
                    NewValue = table.Column<string>(nullable: true),
                    OldValue = table.Column<string>(nullable: true),
                    PropertyName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditTrailValues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AuditTrailValues_AuditTrailEntities_AuditTrailEntityId",
                        column: x => x.AuditTrailEntityId,
                        principalTable: "AuditTrailEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AuditTrailEntities_AuditTrailId",
                table: "AuditTrailEntities",
                column: "AuditTrailId");

            migrationBuilder.CreateIndex(
                name: "IX_AuditTrailValues_AuditTrailEntityId",
                table: "AuditTrailValues",
                column: "AuditTrailEntityId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AuditTrailValues");

            migrationBuilder.DropTable(
                name: "AuditTrailEntities");

            migrationBuilder.DropTable(
                name: "AuditTrails");
        }
    }
}
