using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Reflection.Metadata;

namespace API_tarefas
{
    public class TarefaDbContext : DbContext
    {
        public DbSet<Tarefa> Tarefas { get; set; }

        public string DbPath { get; }

        public TarefaDbContext()
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            DbPath = System.IO.Path.Join(path, "tarefas.db");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite($"Data Source={DbPath}");
    }

    public class Tarefa
    {
        public int id { get; set; }
        public string titulo { get; set; }
        public string descricao { get; set; }
        public DateTime data_vencimento { get; set; }
        public int status { get; set; }

    }
}
