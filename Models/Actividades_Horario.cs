namespace ungDbWebApi.Models;

public class Actividades_Horario
{
    public int id_actividad_horario { get; set; }
    public int id_horario { get; set; }
    public string descripcion { get; set; }
    public string hora { get; set; }
    public int? frecuencia { get; set; }
    
    //Navigation
    public Horarios? HorarioN { get; set; }
}