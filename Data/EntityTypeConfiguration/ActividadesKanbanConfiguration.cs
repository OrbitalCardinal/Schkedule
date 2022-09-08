using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ungDbWebApi.Models;

namespace ungDbWebApi.Data.EntityTypeConfiguration;

public class ActividadesKanbanConfiguration : IEntityTypeConfiguration<Actividades_Kanban>
{
    public void Configure(EntityTypeBuilder<Actividades_Kanban> builder)
    {
        builder.HasKey(s => s.id_actividad_kanban);
    }
}