namespace ungDbWebApi.Models;

public class Actividades_Gantt
{
    public int id_actividad_gantt { get; set; }
    public int id_diagrama { get; set; }
    public string descripcion { get; set; }
    public DateTime? fecha_inicial { get; set; }
    public DateTime? fecha_final { get; set; }
    
    //Navigation
    public Diagramas_Gantt? DiagramaN { get; set; }
}