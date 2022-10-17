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
    
    [HttpGet("usuario/{usu}")]
    //Get api/gantt
    public ActionResult<List<Proyectos>> GetByUsuario(int usu) {
        return _proyectosService.GetByUsuario(usu);
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