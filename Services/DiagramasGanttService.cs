using ungDbWebApi.Data;
using ungDbWebApi.Models;

namespace ungDbWebApi.Services;

public class DiagramasGanttService
{
    private readonly ungDbContext _db;
        
    public DiagramasGanttService(ungDbContext db)
    {
        _db = db;
    }
    
    public List<Diagramas_Gantt> GetAll()
    {
        return _db.Diagramas_Gantt.OrderBy(u => u.id_diagrama).ToList();
    }
    
    public List<Diagramas_Gantt> GetByUsuario(int usu)
    {
        return _db.Diagramas_Gantt
            .Where(a => a.id_usuario.Equals(usu))
            .OrderBy(u => u.id_diagrama).ToList();
    }
        
    public Diagramas_Gantt GetById(int id)
    {
        return _db.Diagramas_Gantt.Find(id);
    }
    
    public Diagramas_Gantt Insertar(Diagramas_Gantt data)
    {
        var dbdia = GetById(data.id_diagrama);
        if (dbdia == null)
        {
            try {
                data.id_diagrama = _db.Diagramas_Gantt.Select(m => m.id_diagrama).Max() + 1;
            }
            catch (Exception e) {
                data.id_diagrama = 1;
            }
            data.fecha_creacion = DateTime.Now;
            data.ultima_modificacion = DateTime.Now;
            
            Diagramas_Gantt newD = new Diagramas_Gantt();
            newD = data;
            _db.Add(newD);
        }
        else
        {
            dbdia.nombre_diagrama = data.nombre_diagrama;
            dbdia.ultima_modificacion = DateTime.Now;
            
            _db.Update(dbdia);
        }

        _db.SaveChanges();

        return GetById(data.id_diagrama);
    }
    
    public void Borrar(int clave)
    {
        var diagrama = GetById(clave);
        _db.Remove(diagrama);
        _db.SaveChanges();
    }
}