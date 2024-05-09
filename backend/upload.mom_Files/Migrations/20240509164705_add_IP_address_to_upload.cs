using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace upload.mom_Files.Migrations
{
    /// <inheritdoc />
    public partial class add_IP_address_to_upload : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "IpAddress",
                table: "Files",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IpAddress",
                table: "Files");
        }
    }
}
