using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Club_Manager.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class EmailfieldtoTickettable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Tickets",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Tickets");
        }
    }
}
