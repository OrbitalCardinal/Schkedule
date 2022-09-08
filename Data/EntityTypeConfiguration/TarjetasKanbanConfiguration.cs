using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ungDbWebApi.Models;

namespace ungDbWebApi.Data.EntityTypeConfiguration;

public class TarjetasKanbanConfiguration : IEntityTypeConfiguration<Tarjetas_Kanban>
{
    public void Configure(EntityTypeBuilder<Tarjetas_Kanban> builder)
    {
        builder.HasKey(s => s.id_tarjeta);
        //Llaves foraneas
        builder.HasMany(u => u.ActividadesKN)
            .WithOne(h => h.TarjetaN)
            .HasForeignKey(h => h.id_tarjeta);
    }
}