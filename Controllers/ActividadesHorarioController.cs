using Microsoft.AspNetCore.Mvc;
using ungDbWebApi.Models;
using ungDbWebApi.Services;

namespace ungDbWebApi.Controllers;
[Route("api/actividadeshorario")]
[ApiController]
public class ActividadesHorarioController
{
    private readonly ActividadesHorarioService _actividadService;
    
    public ActividadesHorarioController(ActividadesHorarioService actividadService)
    {
        _actividadService = actividadService;
    }
    
    [HttpGet("horario/{hor}")]
    //Get api/actividadeshorario
    public ActionResult<List<Actividades_Horario>> GetAll(int hor) {
        return _actividadService.GetAll(hor);
    }

    [HttpGet("{id}")]
    //Get api/actividadeshorario/{id}
    public ActionResult<Actividades_Horario> GetById(int id) {
        return _actividadService.GetById(id);
    }
    
    [HttpPost]
    //Get/api/actividadeshorario/{id}
    public ActionResult<Actividades_Horario> Insertar(Actividades_Horario data)
    {
        return _actividadService.Insertar(data);
    }
    
    [HttpDelete("{id}")]
    //Get/api/actividadeshorario/{id}
    public void Borrar(int id)
    {
        _actividadService.Borrar(id);
    }
}