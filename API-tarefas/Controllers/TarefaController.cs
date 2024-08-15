using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace API_tarefas.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TarefaController : ControllerBase
    {

        private readonly ILogger<TarefaController> _logger;
        private TarefaDbContext _context;

        public TarefaController(ILogger<TarefaController> logger)
        {
            _logger = logger;
            _context = new TarefaDbContext();
        }

        [HttpGet(Name = "GetAllTarefas")]
        public async Task<ActionResult<Tarefa[]>> GetAll()
        {
            return await _context.Tarefas.ToArrayAsync();
        }

        [HttpGet("id", Name = "GetTarefa")]
        public async Task<ActionResult<Tarefa?>> Get(int id)
        {
            return await _context.Tarefas.FindAsync(id);
        }

        [HttpPost(Name = "AddTarefas")]
        public async Task<ActionResult<Tarefa>> PostTarefa(Tarefa tarefa)
        {
            _context.Tarefas.Add(tarefa);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(PostTarefa), tarefa);
        }
    }
}
