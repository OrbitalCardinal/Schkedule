using Microsoft.AspNetCore.Mvc;
using ungDbWebApi.Models;
using ungDbWebApi.Services;

namespace ungDbWebApi.Controllers;
[Route("api/actividadesgantt")]
[ApiController]
public class ActividadesGanttController
{
    private readonly ActividadesGanttService _actividadService;
    
    public ActividadesGanttController(ActividadesGanttService actividadService)
    {
        _actividadService = actividadService;
    }
    
    [HttpGet("diagrama/{dia}")]
    //Get api/usuarios
    public ActionResult<List<Actividades_Gantt>> GetAll(int dia) {
        return _actividadService.GetAll(dia);
    }

    [HttpGet("{id}")]
    //Get api/usuarios/{id}
    public ActionResult<Actividades_Gantt> GetById(int id) {
        return _actividadService.GetById(id);
    }
    
    [HttpPost]
    //Get/api/usuarios/{id}
    public ActionResult<Actividades_Gantt> Insertar(Actividades_Gantt data)
    {
        return _actividadService.Insertar(data);
    }
    
    [HttpDelete("{id}")]
    //Get/api/usuarios/{id}
    public void Borrar(int id)
    {
        _actividadService.Borrar(id);
    }
}