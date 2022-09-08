using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ungDbWebApi.Models;

namespace ungDbWebApi.Data.EntityTypeConfiguration;

public class ActividadesProyectoConfiguration : IEntityTypeConfiguration<Actividades_Proyecto>
{
    public void Configure(EntityTypeBuilder<Actividades_Proyecto> builder)
    {
        builder.HasKey(s => s.id_actividad_proyecto);
    }
}