using Microsoft.EntityFrameworkCore;
using ungDbWebApi.Data;
using ungDbWebApi.Models;

namespace ungDbWebApi.Services;

public class UsuariosService
{
    private readonly ungDbContext _db;
        
    public UsuariosService(ungDbContext db)
    {
        _db = db;
    }
        
    public List<Usuarios> GetAll()
    {
        return _db.Usuarios.OrderBy(u => u.id_usuario).ToList();
    }
        
    public Usuarios GetById(int id)
    {
        return _db.Usuarios.Find(id);
    }
    
    public Usuarios Insertar(Usuarios data)
    {
        var dbusu = GetById(data.id_usuario);
        if (dbusu == null)
        {
            try {
                data.id_usuario = _db.Usuarios.Select(m => m.id_usuario).Max() + 1;
            }
            catch (Exception e) {
                data.id_usuario = 1;
            }
            data.fecha_registro = DateTime.Now;
            
            Usuarios newU = new Usuarios();
            newU = data;
            _db.Add(newU);
        }
        else
        {
            dbusu.nombre_completo = data.nombre_completo;
            dbusu.nombre_usuario = data.nombre_usuario;
            dbusu.contrasena = data.contrasena;
            _db.Update(dbusu);
        }

        _db.SaveChanges();

        return GetById(data.id_usuario);
    }

    public void Borrar(int clave)
    {
        var usuario = GetById(clave);
        _db.Remove(usuario);
        _db.SaveChanges();
    }
    
    public List<Detalles_Usuario> GetDetalles()
    {
        return _db.Detalles_Usuario.OrderBy(u => u.id_usuario).ToList();
    }
        
    public Detalles_Usuario GetDetallesById(int id)
    {
        return _db.Detalles_Usuario.FirstOrDefault(d => d.id_usuario.Equals(id));
    }
}