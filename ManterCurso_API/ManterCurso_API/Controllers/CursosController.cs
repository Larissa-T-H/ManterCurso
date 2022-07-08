using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ManterCurso_API.Data;
using ManterCurso_API.Models;
using System.ComponentModel.DataAnnotations;

namespace ManterCurso_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CursosController : ControllerBase
    {
        private readonly ManterCurso_APIContext _context;

        public CursosController(ManterCurso_APIContext context)
        {
            _context = context;
        }

        // GET: api/Cursos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Curso>>> GetCurso()
        {
            var curso = await _context.Curso.ToListAsync();
            return Ok(curso);
        }

        

        // GET: api/Cursos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Curso>> GetCurso(int id)
        {
            var curso = await _context.Curso.FindAsync(id);

            if (curso == null)
            {
                return NotFound();
            }

            return curso;
        }

        // PUT: api/Cursos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCurso(int id, Curso curso)
        {
            

            if (curso.DataInicio.Date < DateTime.Now.Date)
            {
                return BadRequest(new { mensagem = "Data de início menor que data atual" });
            }
            if (curso.DataTermino.Date < curso.DataInicio.Date)
            {
                return BadRequest(new { mensagem = "Data do término menor que data de inicio" });
            }

            //Boolean Comparacao = (_context.Curso.Any(d => d.DataInicio <= curso.DataTermino || d.DataTermino >= curso.DataInicio
            //|| d.DataTermino == curso.DataTermino || d.DataInicio == curso.DataInicio));

            //if (Comparacao)
            //{
            //    return BadRequest(new { mensagem = "Existe curso planejado dentro de período informado!" });
            //}

            if (id != curso.CursoId)
            {
                return BadRequest(new { mensagem = "Erro Id diferente!!" });

            }

            //_context.Entry(curso).State = EntityState.Modified;
            //await _context.SaveChangesAsync();

            if (ModelState.IsValid)
            {
                _context.Entry(curso).State = EntityState.Modified;
                await _context.SaveChangesAsync();


                var log = await _context.Log.FindAsync(curso.CursoId);
                log.DataAtualizacao = DateTime.Now.Date;
                _context.Entry(log).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return Ok(new { mensagem = "dados gravados com sucesso!!" });
            }


                //if (ModelState.IsValid)
                //{
                //    var log = new Log()
                //{
                //    CursoId = curso.CursoId,
                //    DataAtualizacao = DateTime.Now,
                //    Usuario = "Adm"
                //};
                //_context.Log.Update(log);
                //await _context.SaveChangesAsync();
                //return Ok(new { mensagem = "dados gravados com sucesso!!" });

                //}

                return BadRequest(new { mensagem = "erro!!" });



            //var log = await _context.Log.FindAsync(curso.CursoId);
            //log.DataAtualizacao = DateTime.Now;
            //_context.Log.Update(log);
            //await _context.SaveChangesAsync();

            

        }

        // POST: api/Cursos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Curso>> PostCurso(Curso curso)
        {
            if (curso.DataInicio.Date < DateTime.Now.Date)
            {
                return BadRequest(new { mensagem = "Data de inicio menor que data atual" });
            }
            if (curso.DataTermino.Date < curso.DataInicio.Date)
            {
                return BadRequest(new { mensagem = "Data do termino menor que data de inicio" });
            }

            Boolean Comparacao = (_context.Curso.Any(d => d.DataInicio <= curso.DataTermino && d.DataTermino >= curso.DataInicio
            || d.DataTermino == curso.DataTermino && d.DataInicio == curso.DataInicio));

            if (Comparacao)
            {
                return BadRequest(new { mensagem = "Existe curso planejado dentro de período informado!" });
            }
            if (ModelState.IsValid)
            {
                _context.Curso.Add(curso);
                await _context.SaveChangesAsync();
                CreatedAtAction("GetCurso", new { id = curso.CursoId }, curso);

                var log = new Log()
                {
                    CursoId = curso.CursoId,
                    DataInclusao = DateTime.Now,
                    DataAtualizacao = DateTime.Now,
                    Usuario = "Adm"
                };
                _context.Log.Add(log);
                await _context.SaveChangesAsync();
                return Ok(new { mensagem = "dados gravados com sucesso!!" });
            }

            return BadRequest(new { mensagem = "erro!!" });        

        }


        // DELETE: api/Cursos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCurso(int id)
        {
            var curso = await _context.Curso.FindAsync(id);
            if (curso == null)
            {
                return NotFound();
            }

            _context.Curso.Remove(curso);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CursoExists(int id)
        {
            return _context.Curso.Any(e => e.CursoId == id);
        }






        //private async Task<ActionResult> AtualizacaoLog(Curso curso)
        //{
        //    var log = await _context.Log.FindAsync(curso.CursoId);
        //    log.DataAtualizacao = DateTime.Now;
        //    try
        //    {
        //        await _context.Log.Update();
        //    }
        //    catch (Exception)
        //    {
        //        return BadRequest();
        //    }
        //    return NoContent();
        //}
    }
}
