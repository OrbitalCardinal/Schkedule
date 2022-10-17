namespace ungDbWebApi.Models;

public class Horarios
{
    public int id_horario { get; set; }
    public int id_usuario { get; set; }
    public string nombre_horario { get; set; }
    public DateTime? fecha_creacion { get; set; }
    public DateTime? ultima_modificacion { get; set; }
    
    //Navigation
    public Usuarios? UsuarioN { get; set; }
    public List<Actividades_Horario>? ActividadesHN { get; set; }
}