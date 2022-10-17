using ungDbWebApi.Data;
using ungDbWebApi.Models;

namespace ungDbWebApi.Services;

public class ProyectosService
{
    private readonly ungDbContext _db;
        
    public ProyectosService(ungDbContext db)
    {
        _db = db;
    }
        
    public List<Proyectos> GetAll()
    {
        return _db.Proyectos.OrderBy(u => u.id_proyecto).ToList();
    }
    
    public List<Proyectos> GetByUsuario(int usu)
    {
        return _db.Proyectos
            .Where(a => a.id_usuario.Equals(usu))
            .OrderBy(u => u.id_proyecto).ToList();
    }
        
    public Proyectos GetById(int id)
    {
        return _db.Proyectos.Find(id);
    }
    
    public Proyectos Insertar(Proyectos data)
    {
        var dbpro = GetById(data.id_proyecto);
        if (dbpro == null)
        {
            try {
                data.id_proyecto = _db.Proyectos.Select(m => m.id_proyecto).Max() + 1;
            }
            catch (Exception e) {
                data.id_proyecto = 1;
            }
            data.fecha_creacion = DateTime.Now;
            data.ultima_modificacion = DateTime.Now;
            
            Proyectos newP = new Proyectos();
            newP = data;
            _db.Add(newP);
        }
        else
        {
            dbpro.nombre_proyecto = data.nombre_proyecto;
            dbpro.ultima_modificacion = DateTime.Now;
            
            _db.Update(dbpro);
        }

        _db.SaveChanges();

        return GetById(data.id_proyecto);
    }

    public void Borrar(int clave)
    {
        var proyecto = GetById(clave);
        _db.Remove(proyecto);
        _db.SaveChanges();
    }
}