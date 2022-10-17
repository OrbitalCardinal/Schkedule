using ungDbWebApi.Data;
using ungDbWebApi.Models;

namespace ungDbWebApi.Services;

public class TablerosKanbanService
{
    private readonly ungDbContext _db;
        
    public TablerosKanbanService(ungDbContext db)
    {
        _db = db;
    }
    
    public List<Tableros_Kanban> GetAll()
    {
        return _db.Tableros_Kanban.OrderBy(u => u.id_tablero).ToList();
    }
    
    public List<Tableros_Kanban> GetByUsuario(int usu)
    {
        return _db.Tableros_Kanban
            .Where(a => a.id_usuario.Equals(usu))
            .OrderBy(u => u.id_tablero).ToList();
    }
        
    public Tableros_Kanban GetById(int id)
    {
        return _db.Tableros_Kanban.Find(id);
    }
    
    public Tableros_Kanban Insertar(Tableros_Kanban data)
    {
        var dbTab = GetById(data.id_tablero);
        if (dbTab == null)
        {
            try {
                data.id_tablero = _db.Tableros_Kanban.Select(m => m.id_tablero).Max() + 1;
            }
            catch (Exception e) {
                data.id_tablero = 1;
            }
            data.fecha_creacion = DateTime.Now;
            data.ultima_modificacion = DateTime.Now;
            
            Tableros_Kanban newT = new Tableros_Kanban();
            newT = data;
            _db.Add(newT);
        }
        else
        {
            dbTab.nombre_tablero = data.nombre_tablero;
            dbTab.ultima_modificacion = DateTime.Now;
            
            _db.Update(dbTab);
        }

        _db.SaveChanges();

        return GetById(data.id_tablero);
    }
    
    public void Borrar(int clave)
    {
        var tablero = GetById(clave);
        _db.Remove(tablero);
        _db.SaveChanges();
    }
}