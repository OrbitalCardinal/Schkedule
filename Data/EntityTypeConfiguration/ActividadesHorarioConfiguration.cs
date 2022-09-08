using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ungDbWebApi.Models;

namespace ungDbWebApi.Data.EntityTypeConfiguration;

public class ActividadesHorarioConfiguration : IEntityTypeConfiguration<Actividades_Horario>
{
    public void Configure(EntityTypeBuilder<Actividades_Horario> builder)
    {
        builder.HasKey(s => s.id_actividad_horario);
    }
}