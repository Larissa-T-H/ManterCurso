using System;

namespace ManterCurso_API.Models
{
    public class Curso
    {
        public int CursoId { get; set; }
        public string Descricao { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataTermino { get; set; }
        public int Quantidade { get; set; }
        public int CategoriaId { get; set; }
        public bool Status { get; set; } = true;
        public Categoria Categoria { get; set; }
    }
}
