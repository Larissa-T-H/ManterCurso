using Microsoft.EntityFrameworkCore.Migrations;

namespace ManterCurso_API.Migrations
{
    public partial class mudancas : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Curso",
                newName: "IsStatus");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsStatus",
                table: "Curso",
                newName: "Status");
        }
    }
}
