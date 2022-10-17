using ungDbWebApi.Data;
using ungDbWebApi.Models;

namespace ungDbWebApi.Services;

public class TarjetasKanbanService
{
    private readonly ungDbContext _db;
        
    public TarjetasKanbanService(ungDbContext db)
    {
        _db = db;
    }
    
    public List<Tarjetas_Kanban> GetAll(int tab)
    {
        return _db.Tarjetas_Kanban
            .Where(a => a.id_tablero.Equals(tab))
            .OrderBy(u => u.id_tarjeta).ToList();
    }
        
    public Tarjetas_Kanban GetById(int id)
    {
        return _db.Tarjetas_Kanban.Find(id);
    }
    
    public Tarjetas_Kanban Insertar(Tarjetas_Kanban data)
    {
        var dbTar = GetById(data.id_tarjeta);
        if (dbTar == null)
        {
            try {
                data.id_tarjeta = _db.Tarjetas_Kanban.Select(m => m.id_tarjeta).Max() + 1;
            }
            catch (Exception e) {
                data.id_tarjeta = 1;
            }

            Tarjetas_Kanban newT = new Tarjetas_Kanban();
            newT = data;
            _db.Add(newT);
        }
        else
        {
            dbTar.titulo = data.titulo;

            _db.Update(dbTar);
        }

        _db.SaveChanges();

        return GetById(data.id_tarjeta);
    }
    
    public void Borrar(int clave)
    {
        var tarjeta = GetById(clave);
        _db.Remove(tarjeta);
        _db.SaveChanges();
    }
}