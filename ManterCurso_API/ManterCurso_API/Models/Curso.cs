using System;
using System.ComponentModel.DataAnnotations;

namespace ManterCurso_API.Models
{
    public class Curso
    {
        public int CursoId { get; set; }

        [Required (ErrorMessage = "Descrição obrigatório")]
        public string Descricao { get; set; }

        [DataType(DataType.Date)]
        [Display(Name = "Data de Início")]
        [Required (ErrorMessage = "Data de Início obrigatório")]
        public DateTime DataInicio { get; set; }

        [DataType(DataType.Date)]
        [Display(Name = "Data do Término")]
        [Required(ErrorMessage = "Data do término obrigatório")]
        public DateTime DataTermino { get; set; }

        public int Quantidade { get; set; }

        [Display(Name = "Categoria")]
        [Required (ErrorMessage = "Categria obrigatório")]
        public int CategoriaId { get; set; }

        public bool? IsStatus { get; set; } = true;

        public Categoria Categoria { get; set; }
    }
}
