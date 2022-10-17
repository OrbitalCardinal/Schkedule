namespace ungDbWebApi.Models;

public class Diagramas_Gantt
{
    public int id_diagrama { get; set; }
    public int id_usuario { get; set; }
    public string nombre_diagrama { get; set; }
    public DateTime? fecha_creacion { get; set; }
    public DateTime? ultima_modificacion { get; set; }
    
    //Navigation
    public Usuarios? UsuarioN { get; set; }
    public List<Actividades_Gantt>? ActividadesGN { get; set; }
}