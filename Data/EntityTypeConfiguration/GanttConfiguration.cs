using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ungDbWebApi.Models;

namespace ungDbWebApi.Data.EntityTypeConfiguration;

public class GanttConfiguration : IEntityTypeConfiguration<Diagramas_Gantt>
{
    public void Configure(EntityTypeBuilder<Diagramas_Gantt> builder)
    {
        builder.HasKey(s => s.id_diagrama);
        //Llaves foraneas
        builder.HasMany(u => u.ActividadesGN)
            .WithOne(h => h.DiagramaN)
            .HasForeignKey(h => h.id_diagrama);
    }
}