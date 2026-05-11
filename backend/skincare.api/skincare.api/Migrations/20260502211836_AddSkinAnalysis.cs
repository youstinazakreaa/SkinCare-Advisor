using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace skincare.api.Migrations
{
    /// <inheritdoc />
    public partial class AddSkinAnalysis : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SkinAnalyses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    SkinType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AgeGroup = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Budget = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SunExposure = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WaterLevel = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Concerns = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Habits = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SelectedProducts = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AcneNow = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Irritation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Makeup = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Allergies = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sleep = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Stress = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Diet = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SkinAnalyses", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SkinAnalyses");
        }
    }
}
