using ungDbWebApi.Data;
using ungDbWebApi.Models;

namespace ungDbWebApi.Services;

public class ActividadesGanttService
{
    private readonly ungDbContext _db;
        
    public ActividadesGanttService(ungDbContext db)
    {
        _db = db;
    }
    
    public List<Actividades_Gantt> GetAll(int dia)
    {
        return _db.Actividades_Gantt
            .Where(a => a.id_diagrama.Equals(dia))
            .OrderBy(u => u.id_actividad_gantt).ToList();
    }
        
    public Actividades_Gantt GetById(int id)
    {
        return _db.Actividades_Gantt.Find(id);
    }
    
    public Actividades_Gantt Insertar(Actividades_Gantt data)
    {
        var dbact = GetById(data.id_actividad_gantt);
        if (dbact == null)
        {
            try {
                data.id_actividad_gantt = _db.Actividades_Gantt.Select(m => m.id_actividad_gantt).Max() + 1;
            }
            catch (Exception e) {
                data.id_actividad_gantt = 1;
            }

            Actividades_Gantt newA = new Actividades_Gantt();
            newA = data;
            _db.Add(newA);
        }
        else
        {
            dbact.descripcion = data.descripcion;
            dbact.fecha_inicial = data.fecha_inicial;
            dbact.fecha_final = data.fecha_final;

            _db.Update(dbact);
        }

        _db.SaveChanges();

        return GetById(data.id_actividad_gantt);
    }
    
    public void Borrar(int clave)
    {
        var act = GetById(clave);
        _db.Remove(act);
        _db.SaveChanges();
    }
}