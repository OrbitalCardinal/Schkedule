using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ungDbWebApi.Models;

namespace ungDbWebApi.Data.EntityTypeConfiguration;

public class UsuariosConfiguration : IEntityTypeConfiguration<Usuarios>
{
    public void Configure(EntityTypeBuilder<Usuarios> builder)
    {
        builder.HasKey(s => s.id_usuario);
        //Llaves foraneas
        builder.HasMany(u => u.HorariosN)
            .WithOne(h => h.UsuarioN)
            .HasForeignKey(h => h.id_usuario);
        builder.HasMany(u => u.ProyectosN)
            .WithOne(h => h.UsuarioN)
            .HasForeignKey(h => h.id_usuario);
        builder.HasMany(u => u.DiagramasN)
            .WithOne(h => h.UsuarioN)
            .HasForeignKey(h => h.id_usuario);
        builder.HasMany(u => u.TablerosN)
            .WithOne(h => h.UsuarioN)
            .HasForeignKey(h => h.id_usuario);
    }
}