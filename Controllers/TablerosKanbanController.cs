using Microsoft.AspNetCore.Mvc;
using ungDbWebApi.Models;
using ungDbWebApi.Services;

namespace ungDbWebApi.Controllers;
[Route("api/tableroskanban")]
[ApiController]
public class TablerosKanbanController
{
    private readonly TablerosKanbanService _tablerosService;
    
    public TablerosKanbanController(TablerosKanbanService tablerosService)
    {
        _tablerosService = tablerosService;
    }
    
    [HttpGet]
    //Get api/gantt
    public ActionResult<List<Tableros_Kanban>> GetAll() {
        return _tablerosService.GetAll();
    }
    
    [HttpGet("usuario/{usu}")]
    //Get api/gantt
    public ActionResult<List<Tableros_Kanban>> GetByUsuario(int usu) {
        return _tablerosService.GetByUsuario(usu);
    }

    [HttpGet("{id}")]
    //Get api/gantt/{id}
    public ActionResult<Tableros_Kanban> GetById(int id) {
        return _tablerosService.GetById(id);
    }
    
    [HttpPost]
    //Get/api/gantt/{id}
    public ActionResult<Tableros_Kanban> Insertar(Tableros_Kanban data)
    {
        return _tablerosService.Insertar(data);
    }
    
    [HttpDelete("{id}")]
    //Get/api/gantt/{id}
    public void Borrar(int id)
    {
        _tablerosService.Borrar(id);
    }
}