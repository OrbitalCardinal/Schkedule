using Microsoft.AspNetCore.Mvc;
using ungDbWebApi.Models;
using ungDbWebApi.Services;

namespace ungDbWebApi.Controllers;
[Route("api/proyectos")]
[ApiController]
public class ProyectosController
{
    private readonly ProyectosService _proyectosService;
    
    public ProyectosController(ProyectosService proyectosService)
    {
        _proyectosService = proyectosService;
    }
        
    [HttpGet]
    //Get api/usuarios
    public ActionResult<List<Proyectos>> GetAll() {
        return _proyectosService.GetAll();
    }

    [HttpGet("{id}")]
    //Get api/usuarios/{id}
    public ActionResult<Proyectos> GetById(int id) {
        return _proyectosService.GetById(id);
    }
    
    [HttpPost]
    //Get/api/usuarios/{id}
    public ActionResult<Proyectos> Insertar(Proyectos data)
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