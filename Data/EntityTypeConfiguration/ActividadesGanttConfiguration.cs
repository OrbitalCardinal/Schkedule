using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ungDbWebApi.Models;

namespace ungDbWebApi.Data.EntityTypeConfiguration;

public class ActividadesGanttConfiguration : IEntityTypeConfiguration<Actividades_Gantt>
{
    public void Configure(EntityTypeBuilder<Actividades_Gantt> builder)
    {
        builder.HasKey(s => s.id_actividad_gantt);
    }
}