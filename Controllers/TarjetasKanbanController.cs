using Microsoft.AspNetCore.Mvc;
using ungDbWebApi.Models;
using ungDbWebApi.Services;

namespace ungDbWebApi.Controllers;
[Route("api/tarjetaskanban")]
[ApiController]
public class TarjetasKanbanController
{
    private readonly TarjetasKanbanService _tarjetasService;
    
    public TarjetasKanbanController(TarjetasKanbanService tarjetasService)
    {
        _tarjetasService = tarjetasService;
    }
    
    [HttpGet("tablero/{tab}")]
    //Get api/actividadeshorario
    public ActionResult<List<Tarjetas_Kanban>> GetAll(int tab) {
        return _tarjetasService.GetAll(tab);
    }
 
    [HttpGet("{id}")]
    //Get api/actividadeshorario/{id}
    public ActionResult<Tarjetas_Kanban> GetById(int id) {
        return _tarjetasService.GetById(id);
    }
    
    [HttpPost]
    //Get/api/actividadeshorario/{id}
    public ActionResult<Tarjetas_Kanban> Insertar(Tarjetas_Kanban data)
    {
        return _tarjetasService.Insertar(data);
    }
    
    [HttpDelete("{id}")]
    //Get/api/actividadeshorario/{id}
    public void Borrar(int id)
    {
        _tarjetasService.Borrar(id);
    }
}