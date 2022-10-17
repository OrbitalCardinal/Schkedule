namespace ungDbWebApi.Models;

public class Tarjetas_Kanban
{
    public int id_tarjeta { get; set; }
    public int id_tablero { get; set; }
    public string titulo { get; set; }
    
    //Navigation
    public Tableros_Kanban? TableroN { get; set; }
    public List<Actividades_Kanban>? ActividadesKN { get; set; }
}