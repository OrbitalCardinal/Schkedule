using Microsoft.AspNetCore.Mvc;
using ungDbWebApi.Models;
using ungDbWebApi.Services;

namespace ungDbWebApi.Controllers;
[Route("api/actividadesproyecto")]
[ApiController]
public class ActividadesProyectoController
{
    private readonly ActividadesProyectoService _proyectosService;
    
    public ActividadesProyectoController(ActividadesProyectoService proyectosService)
    {
        _proyectosService = proyectosService;
    }
        
    [HttpGet("proyecto/{proy}")]
    //Get api/usuarios
    public ActionResult<List<Actividades_Proyecto>> GetAll(int proy) {
        return _proyectosService.GetAll(proy);
    }

    [HttpGet("{id}")]
    //Get api/usuarios/{id}
    public ActionResult<Actividades_Proyecto> GetById(int id) {
        return _proyectosService.GetById(id);
    }
    
    [HttpPost]
    //Get/api/usuarios/{id}
    public ActionResult<Actividades_Proyecto> Insertar(Actividades_Proyecto data)
    {
        return _proyectosService.Insertar(data);
    }
    
    [HttpDelete("{id}")]
    //Get/api/usuarios/{id}
    public void Borrar(int id)
    {
        _proyectosService.Borrar(id);
    }
}