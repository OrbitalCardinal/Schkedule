using ungDbWebApi.Data;
using ungDbWebApi.Models;

namespace ungDbWebApi.Services;

public class ActividadesProyectoService
{
    private readonly ungDbContext _db;
        
    public ActividadesProyectoService(ungDbContext db)
    {
        _db = db;
    }
        
    public List<Actividades_Proyecto> GetAll(int proy)
    {
        return _db.Actividades_Proyecto
            .Where(a => a.id_proyecto.Equals(proy))
            .OrderBy(u => u.id_actividad_proyecto).ToList();
    }
        
    public Actividades_Proyecto GetById(int id)
    {
        return _db.Actividades_Proyecto.Find(id);
    }
    
    public Actividades_Proyecto Insertar(Actividades_Proyecto data)
    {
        var dbpro = GetById(data.id_actividad_proyecto);
        if (dbpro == null)
        {
            try {
                data.id_actividad_proyecto = _db.Actividades_Proyecto.Select(m => m.id_actividad_proyecto).Max() + 1;
            }
            catch (Exception e) {
                data.id_actividad_proyecto = 1;
            }

            Actividades_Proyecto newP = new Actividades_Proyecto();
            newP = data;
            _db.Add(newP);
        }
        else
        {
            dbpro.nombre_actividad = data.nombre_actividad;
            dbpro.estatus_actividad = data.estatus_actividad;
            dbpro.categoria_actividad = data.categoria_actividad;
            dbpro.fecha_actividad = data.fecha_actividad;
            
            _db.Update(dbpro);
        }

        _db.SaveChanges();

        return GetById(data.id_actividad_proyecto);
    }

    public void Borrar(int clave)
    {
        var proyecto = GetById(clave);
        _db.Remove(proyecto);
        _db.SaveChanges();
    }
}