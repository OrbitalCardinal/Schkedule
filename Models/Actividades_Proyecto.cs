namespace ungDbWebApi.Models;

public class Actividades_Proyecto
{
    public int id_actividad_proyecto { get; set; }
    public int id_proyecto { get; set; }
    public string nombre_actividad { get; set; }
    public string estatus_actividad { get; set; }
    public string categoria_actividad { get; set; }
    public DateTime? fecha_actividad { get; set; }
    
    //Navigation
    public Proyectos? ProyectoN { get; set; }
}