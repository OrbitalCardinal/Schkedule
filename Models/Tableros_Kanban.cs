namespace ungDbWebApi.Models;

public class Tableros_Kanban
{
    public int id_tablero { get; set; }
    public int id_usuario { get; set; }
    public string nombre_tablero { get; set; }
    public DateTime? ultima_modificacion { get; set; }
    public DateTime? fecha_creacion { get; set; }
    
    //Navigation
    public Usuarios? UsuarioN { get; set; }
    public List<Tarjetas_Kanban>? TarjetasN { get; set; }
}