using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ungDbWebApi.Models;

namespace ungDbWebApi.Data.EntityTypeConfiguration;

public class HorariosConfiguration : IEntityTypeConfiguration<Horarios>
{
    public void Configure(EntityTypeBuilder<Horarios> builder)
    {
        builder.HasKey(s => s.id_horario);
        //Llaves foraneas
        builder.HasMany(u => u.ActividadesHN)
            .WithOne(h => h.HorarioN)
            .HasForeignKey(h => h.id_horario);
    }
}