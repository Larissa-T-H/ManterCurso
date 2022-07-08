using Microsoft.EntityFrameworkCore.Migrations;

namespace ManterCurso_API.Migrations
{
    public partial class atualizacoes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DataAtualicacao",
                table: "Log",
                newName: "DataAtualizacao");

            migrationBuilder.AddColumn<string>(
                name: "Usuario",
                table: "Log",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Descricao",
                table: "Curso",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Usuario",
                table: "Log");

            migrationBuilder.RenameColumn(
                name: "DataAtualizacao",
                table: "Log",
                newName: "DataAtualicacao");

            migrationBuilder.AlterColumn<string>(
                name: "Descricao",
                table: "Curso",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }
    }
}
