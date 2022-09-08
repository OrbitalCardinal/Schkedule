using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ungDbWebApi.Models;

namespace ungDbWebApi.Data.EntityTypeConfiguration;

public class DetallesUsuarioConfiguration : IEntityTypeConfiguration<Detalles_Usuario>
{
    public void Configure(EntityTypeBuilder<Detalles_Usuario> builder)
    {
        builder.HasNoKey();
        builder.ToView("Detalles_Usuario");
}
}