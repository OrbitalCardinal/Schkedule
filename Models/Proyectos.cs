namespace ungDbWebApi.Models;

public class Proyectos
{
    public int id_proyecto { get; set; }
    public int id_usuario { get; set; }
    public string nombre_proyecto { get; set; }
    public DateTime? ultima_modificacion { get; set; }
    public DateTime? fecha_creacion { get; set; }
    
    //Navigation
    public Usuarios? UsuarioN { get; set; }
    public List<Actividades_Proyecto>? ActividadesPN { get; set; }
}