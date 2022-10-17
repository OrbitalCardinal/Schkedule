using ungDbWebApi.Data;
using ungDbWebApi.Models;

namespace ungDbWebApi.Services;

public class ActividadesHorarioService
{
    private readonly ungDbContext _db;
        
    public ActividadesHorarioService(ungDbContext db)
    {
        _db = db;
    }
    
    public List<Actividades_Horario> GetAll(int hor)
    {
        return _db.Actividades_Horario
            .Where(a => a.id_horario.Equals(hor))
            .OrderBy(u => u.id_actividad_horario).ToList();
    }
        
    public Actividades_Horario GetById(int id)
    {
        return _db.Actividades_Horario.Find(id);
    }
    
    public Actividades_Horario Insertar(Actividades_Horario data)
    {
        var dbact = GetById(data.id_actividad_horario);
        if (dbact == null)
        {
            try {
                data.id_actividad_horario = _db.Actividades_Horario.Select(m => m.id_actividad_horario).Max() + 1;
            }
            catch (Exception e) {
                data.id_actividad_horario = 1;
            }

            Actividades_Horario newA = new Actividades_Horario();
            newA = data;
            _db.Add(newA);
        }
        else
        {
            dbact.descripcion = data.descripcion;
            dbact.hora = data.hora;
            dbact.frecuencia = data.frecuencia;

            _db.Update(dbact);
        }

        _db.SaveChanges();

        return GetById(data.id_actividad_horario);
    }
    
    public void Borrar(int clave)
    {
        var act = GetById(clave);
        _db.Remove(act);
        _db.SaveChanges();
    }
}