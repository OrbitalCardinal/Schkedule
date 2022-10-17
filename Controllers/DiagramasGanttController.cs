using Microsoft.AspNetCore.Mvc;
using ungDbWebApi.Models;
using ungDbWebApi.Services;

namespace ungDbWebApi.Controllers;
[Route("api/gantt")]
[ApiController]
public class DiagramasGanttController
{
    private readonly DiagramasGanttService _ganttService;
    
    public DiagramasGanttController(DiagramasGanttService ganttService)
    {
        _ganttService = ganttService;
    }
    
    [HttpGet]
    //Get api/gantt
    public ActionResult<List<Diagramas_Gantt>> GetAll() {
        return _ganttService.GetAll();
    }
    
    [HttpGet("usuario/{usu}")]
    //Get api/gantt
    public ActionResult<List<Diagramas_Gantt>> GetByUsuario(int usu) {
        return _ganttService.GetByUsuario(usu);
    }

    [HttpGet("{id}")]
    //Get api/gantt/{id}
    public ActionResult<Diagramas_Gantt> GetById(int id) {
        return _ganttService.GetById(id);
    }
    
    [HttpPost]
    //Get/api/gantt/{id}
    public ActionResult<Diagramas_Gantt> Insertar(Diagramas_Gantt data)
    {
        return _ganttService.Insertar(data);
    }
    
    [HttpDelete("{id}")]
    //Get/api/gantt/{id}
    public void Borrar(int id)
    {
        _ganttService.Borrar(id);
    }
}