using System;

namespace ManterCurso_API.Models
{
    public class Log
    {
        public int LogId { get; set; }
        public int CursoId { get; set; }
        public DateTime DataInclusao { get; set; }
        public DateTime? DataAtualicacao { get; set; }
        public Curso Curso { get; set; }
    }
}
