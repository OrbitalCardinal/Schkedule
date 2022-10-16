using ungDbWebApi.Data;
using ungDbWebApi.Models;

namespace ungDbWebApi.Services;

public class ActividadesKanbanService
{
    private readonly ungDbContext _db;
        
    public ActividadesKanbanService(ungDbContext db)
    {
        _db = db;
    }
    
    public List<Actividades_Kanban> GetAll(int tar)
    {
        return _db.Actividades_Kanban
            .Where(a => a.id_tarjeta.Equals(tar))
            .OrderBy(u => u.id_actividad_kanban).ToList();
    }
        
    public Actividades_Kanban GetById(int id)
    {
        return _db.Actividades_Kanban.Find(id);
    }
    
    public Actividades_Kanban Insertar(Actividades_Kanban data)
    {
        var dbact = GetById(data.id_actividad_kanban);
        if (dbact == null)
        {
            try {
                data.id_actividad_kanban = _db.Actividades_Kanban.Select(m => m.id_actividad_kanban).Max() + 1;
            }
            catch (Exception e) {
                data.id_actividad_kanban = 1;
            }

            Actividades_Kanban newA = new Actividades_Kanban();
            newA = data;
            _db.Add(newA);
        }
        else
        {
            dbact.descripcion = data.descripcion;
            dbact.prioridad = data.prioridad;
            dbact.categoria = data.categoria;

            _db.Update(dbact);
        }

        _db.SaveChanges();

        return GetById(data.id_actividad_kanban);
    }
    
    public void Borrar(int clave)
    {
        var act = GetById(clave);
        _db.Remove(act);
        _db.SaveChanges();
    }
}