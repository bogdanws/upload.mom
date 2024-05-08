using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace upload.mom_Files.Migrations
{
    /// <inheritdoc />
    public partial class remove_upload_name : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Files");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Files");

            migrationBuilder.AddColumn<string>(
                name: "Id",
                table: "Files",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                comment: "Unique identifier for the file");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Files",
                newName: "Name");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Files",
                type: "integer",
                nullable: false)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);
        }
    }
}
