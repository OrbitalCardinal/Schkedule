using ungDbWebApi.Data;
using ungDbWebApi.Models;

namespace ungDbWebApi.Services;

public class HorariosService
{
    private readonly ungDbContext _db;
        
    public HorariosService(ungDbContext db)
    {
        _db = db;
    }
    
    public List<Horarios> GetAll()
    {
        return _db.Horarios.OrderBy(u => u.id_horario).ToList();
    }
    
    public List<Horarios> GetByUsuario(int usu)
    {
        return _db.Horarios
            .Where(a => a.id_usuario.Equals(usu))
            .OrderBy(u => u.id_horario).ToList();
    }
        
    public Horarios GetById(int id)
    {
        return _db.Horarios.Find(id);
    }
    
    public Horarios Insertar(Horarios data)
    {
        var dbHor = GetById(data.id_horario);
        if (dbHor == null)
        {
            try {
                data.id_horario = _db.Horarios.Select(m => m.id_horario).Max() + 1;
            }
            catch (Exception e) {
                data.id_horario = 1;
            }
            data.fecha_creacion = DateTime.Now;
            data.ultima_modificacion = DateTime.Now;
            
            Horarios newH = new Horarios();
            newH = data;
            _db.Add(newH);
        }
        else
        {
            dbHor.nombre_horario = data.nombre_horario;
            dbHor.ultima_modificacion = DateTime.Now;
            
            _db.Update(dbHor);
        }

        _db.SaveChanges();

        return GetById(data.id_horario);
    }
    
    public void Borrar(int clave)
    {
        var horario = GetById(clave);
        _db.Remove(horario);
        _db.SaveChanges();
    }
}