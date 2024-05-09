using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace upload.mom_Files.Migrations
{
    /// <inheritdoc />
    public partial class InitialPostMerge : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Files",
                columns: table => new
                {
                    Id = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "Unique identifier for the file"),
                    Files = table.Column<string[]>(type: "text[]", nullable: false),
                    Path = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "Local path to the file"),
                    Size = table.Column<int>(type: "integer", nullable: false),
                    UploadDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Lifetime = table.Column<int>(type: "integer", nullable: false),
                    IpAddress = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Files", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Files");
        }
    }
}
