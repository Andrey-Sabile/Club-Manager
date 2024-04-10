using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Club_Manager.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedSubscriptionsfield : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Renewed",
                table: "Subscriptions");

            migrationBuilder.AddColumn<bool>(
                name: "Paid",
                table: "Subscriptions",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Paid",
                table: "Subscriptions");

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "Renewed",
                table: "Subscriptions",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));
        }
    }
}
