using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ManterCurso_API.Models;

namespace ManterCurso_API.Data
{
    public class ManterCurso_APIContext : DbContext
    {
        public ManterCurso_APIContext (DbContextOptions<ManterCurso_APIContext> options)
            : base(options)
        {
        }

        public DbSet<ManterCurso_API.Models.Categoria> Categoria { get; set; }

        public DbSet<ManterCurso_API.Models.Curso> Curso { get; set; }

        public DbSet<ManterCurso_API.Models.Log> Log { get; set; }
    }
}
