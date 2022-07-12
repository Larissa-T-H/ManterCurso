using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ManterCurso_API.Data;
using ManterCurso_API.Models;

namespace ManterCurso_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogsController : ControllerBase
    {
        private readonly ManterCurso_APIContext _context;

        public LogsController(ManterCurso_APIContext context)
        {
            _context = context;
        }

        // GET: api/Logs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Log>>> GetLog()
        {
            return await _context.Log.ToListAsync();
        }

        // GET: api/Logs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Log>> GetLog(int id)
        {
            var log = await _context.Log.FindAsync(id);

            if (log == null)
            {
                return NotFound();
            }

            return log;
        }
    }
}
