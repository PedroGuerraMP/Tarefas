using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.JSInterop.Infrastructure;
using SQLitePCL;

namespace API_tarefas.Controllers
{
    [EnableCors]
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

        [HttpPut(Name = "EditTarefas")]
        public async Task<ActionResult<Tarefa>> PutTarefa(Tarefa tarefaParam)
        {
            var tarefa = await _context.Tarefas.FirstOrDefaultAsync(t=>t.id == tarefaParam.id);

            if (tarefa != null)
            {
                tarefa.titulo = tarefaParam.titulo;
                tarefa.status = tarefaParam.status;
                tarefa.descricao = tarefaParam.descricao;
                tarefa.data_vencimento = tarefaParam.data_vencimento;
                
                await _context.SaveChangesAsync();
            }

            return CreatedAtAction(nameof(PutTarefa), tarefa);
        }

        [HttpDelete(Name = "DeleteTarefas")]
        public async Task<ActionResult<bool>> DeleteTarefa(int id)
        {
            var tarefa = await _context.Tarefas.FirstOrDefaultAsync(t => t.id == id);

            if (tarefa != null)
            {
                _context.Remove(tarefa);
                await _context.SaveChangesAsync();
            }

            return CreatedAtAction(nameof(DeleteTarefa), tarefa);
        }
    }
}
