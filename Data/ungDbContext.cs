using Microsoft.EntityFrameworkCore;
using ungDbWebApi.Data.EntityTypeConfiguration;
using ungDbWebApi.Models;

namespace ungDbWebApi.Data
{
    public class ungDbContext : DbContext
    {
        
        public ungDbContext(DbContextOptions<ungDbContext> options) : base(options)
        {
            
        }
        
        //DBSET DE TABLAS
        public DbSet<Usuarios> Usuarios { get; set; }
        public DbSet<Horarios> Horarios { get; set; }
        public DbSet<Actividades_Horario> Actividades_Horario { get; set; }
        public DbSet<Proyectos> Proyectos { get; set; }
        public DbSet<Actividades_Proyecto> Actividades_Proyecto { get; set; }
        public DbSet<Diagramas_Gantt> Diagramas_Gantt { get; set; }
        public DbSet<Actividades_Gantt> Actividades_Gantt { get; set; }
        public DbSet<Tableros_Kanban> Tableros_Kanban { get; set; }
        public DbSet<Tarjetas_Kanban> Tarjetas_Kanban { get; set; }
        public DbSet<Actividades_Kanban> Actividades_Kanban { get; set; }
        public DbSet<Detalles_Usuario> Detalles_Usuario { get; set; }
        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //CONGIGURACIONES DE TABLAS
            modelBuilder.ApplyConfiguration(new UsuariosConfiguration());
            modelBuilder.ApplyConfiguration(new HorariosConfiguration());
            modelBuilder.ApplyConfiguration(new ActividadesHorarioConfiguration());
            modelBuilder.ApplyConfiguration(new ProyectosConfiguration());
            modelBuilder.ApplyConfiguration(new ActividadesProyectoConfiguration());
            modelBuilder.ApplyConfiguration(new GanttConfiguration());
            modelBuilder.ApplyConfiguration(new ActividadesGanttConfiguration());
            modelBuilder.ApplyConfiguration(new TablerosKanbanConfiguration());
            modelBuilder.ApplyConfiguration(new TarjetasKanbanConfiguration());
            modelBuilder.ApplyConfiguration(new ActividadesKanbanConfiguration());
            modelBuilder.ApplyConfiguration(new DetallesUsuarioConfiguration());
          
        }
    }
}