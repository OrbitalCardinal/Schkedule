using Microsoft.AspNetCore.Mvc;
using ungDbWebApi.Models;
using ungDbWebApi.Services;

namespace ungDbWebApi.Controllers;
[Route("api/horarios")]
[ApiController]
public class HorariosController
{
    private readonly HorariosService _horariosService;
    
    public HorariosController(HorariosService horariosService)
    {
        _horariosService = horariosService;
    }
    
    [HttpGet]
    //Get api/gantt
    public ActionResult<List<Horarios>> GetAll() {
        return _horariosService.GetAll();
    }
    
    [HttpGet("usuario/{usu}")]
    //Get api/gantt
    public ActionResult<List<Horarios>> GetByUsuario(int usu) {
        return _horariosService.GetByUsuario(usu);
    }

    [HttpGet("{id}")]
    //Get api/gantt/{id}
    public ActionResult<Horarios> GetById(int id) {
        return _horariosService.GetById(id);
    }
    
    [HttpPost]
    //Get/api/gantt/{id}
    public ActionResult<Horarios> Insertar(Horarios data)
    {
        return _horariosService.Insertar(data);
    }
    
    [HttpDelete("{id}")]
    //Get/api/gantt/{id}
    public void Borrar(int id)
    {
        _horariosService.Borrar(id);
    }
}