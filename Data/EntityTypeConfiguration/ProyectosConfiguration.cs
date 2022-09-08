using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ungDbWebApi.Models;

namespace ungDbWebApi.Data.EntityTypeConfiguration;

public class ProyectosConfiguration : IEntityTypeConfiguration<Proyectos>
{
    public void Configure(EntityTypeBuilder<Proyectos> builder)
    {
        builder.HasKey(s => s.id_proyecto);
        //Llaves foraneas
        builder.HasMany(u => u.ActividadesPN)
            .WithOne(h => h.ProyectoN)
            .HasForeignKey(h => h.id_proyecto);
    }
}