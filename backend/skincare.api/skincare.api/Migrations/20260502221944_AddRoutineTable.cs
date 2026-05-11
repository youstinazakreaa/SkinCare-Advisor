using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace skincare.api.Migrations
{
    /// <inheritdoc />
    public partial class AddRoutineTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Routines",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SkinAnalysisId = table.Column<int>(type: "int", nullable: false),
                    MorningSteps = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NightSteps = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FocusNote = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Routines", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Routines");
        }
    }
}
