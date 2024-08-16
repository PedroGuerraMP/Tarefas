using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_tarefas
{
    public class TarefaDbContext : DbContext
    {
        public DbSet<Tarefa> Tarefas { get; set; }

        public TarefaDbContext(DbContextOptions<TarefaDbContext> options) : base(options)
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
        }
    }

    public class Tarefa 
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        public string titulo { get; set; }
        public string descricao { get; set; }
        public DateTime data_vencimento { get; set; }
        public int status { get; set; }
    }
}
