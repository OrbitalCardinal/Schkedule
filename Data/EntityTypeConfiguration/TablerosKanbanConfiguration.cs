using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ungDbWebApi.Models;

namespace ungDbWebApi.Data.EntityTypeConfiguration;

public class TablerosKanbanConfiguration : IEntityTypeConfiguration<Tableros_Kanban>
{
    public void Configure(EntityTypeBuilder<Tableros_Kanban> builder)
    {
        builder.HasKey(s => s.id_tablero);
        //Llaves foraneas
        builder.HasMany(u => u.TarjetasN)
            .WithOne(h => h.TableroN)
            .HasForeignKey(h => h.id_tablero);
    }
}