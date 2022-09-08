namespace ungDbWebApi.Models;

public class Usuarios
{
    public int id_usuario { get; set; }
    public string nombre_completo { get; set; }
    public string nombre_usuario { get; set; }
    public DateTime? fecha_registro { get; set; }
    public string contrasena { get; set; }
    
    //Navigation
    public List<Horarios>? HorariosN { get; set; }
    public List<Proyectos>? ProyectosN { get; set; }
    public List<Diagramas_Gantt>? DiagramasN { get; set; }
    public List<Tableros_Kanban>? TablerosN { get; set; }
}