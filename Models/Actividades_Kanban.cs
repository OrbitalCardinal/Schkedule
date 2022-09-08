namespace ungDbWebApi.Models;

public class Actividades_Kanban
{
    public int id_actividad_kanban { get; set; }
    public int id_tarjeta { get; set; }
    public string descripcion { get; set; }
    public string prioridad { get; set; }
    public string categoria { get; set; }
    
    //Navigation
    public Tarjetas_Kanban TarjetaN { get; set; }
}