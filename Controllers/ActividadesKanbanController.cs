using Microsoft.AspNetCore.Mvc;
using ungDbWebApi.Models;
using ungDbWebApi.Services;

namespace ungDbWebApi.Controllers;
[Route("api/actividadeskanban")]
[ApiController]
public class ActividadesKanbanController
{
    private readonly ActividadesKanbanService _actividadService;
    
    public ActividadesKanbanController(ActividadesKanbanService actividadService)
    {
        _actividadService = actividadService;
    }
    
    [HttpGet("tarjeta/{tar}")]
    //Get api/actividadeskanban
    public ActionResult<List<Actividades_Kanban>> GetAll(int tar) {
        return _actividadService.GetAll(tar);
    }

    [HttpGet("{id}")]
    //Get api/actividadeskanban/{id}
    public ActionResult<Actividades_Kanban> GetById(int id) {
        return _actividadService.GetById(id);
    }
    
    [HttpPost]
    //Get/api/actividadeskanban/{id}
    public ActionResult<Actividades_Kanban> Insertar(Actividades_Kanban data)
    {
        return _actividadService.Insertar(data);
    }
    
    [HttpDelete("{id}")]
    //Get/api/actividadeskanban/{id}
    public void Borrar(int id)
    {
        _actividadService.Borrar(id);
    }
}