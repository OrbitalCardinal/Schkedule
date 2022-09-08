using Microsoft.AspNetCore.Mvc;
using ungDbWebApi.Models;
using ungDbWebApi.Services;

namespace ungDbWebApi.Controllers;
[Route("api/usuarios")]
[ApiController]
public class UsuariosController
{
    private readonly UsuariosService _usuariosService;
    
    public UsuariosController(UsuariosService usuariosService)
    {
        _usuariosService = usuariosService;
    }
        
    [HttpGet]
    //Get api/usuarios
    public ActionResult<List<Usuarios>> GetAll() {
        return _usuariosService.GetAll();
    }

    [HttpGet("{id}")]
    //Get api/usuarios/{id}
    public ActionResult<Usuarios> GetById(int id) {
        return _usuariosService.GetById(id);
    }
    
    [HttpPost]
    //Get/api/usuarios/{id}
    public ActionResult<Usuarios> Insertar(Usuarios data)
    {
        return _usuariosService.Insertar(data);
    }
    
    [HttpDelete("{id}")]
    //Get/api/usuarios/{id}
    public void Borrar(int id)
    {
        _usuariosService.Borrar(id);
    }
    
    [HttpGet("detalles")]
    //Get api/usuarios
    public ActionResult<List<Detalles_Usuario>> GetDetalles() {
        return _usuariosService.GetDetalles();
    }

    [HttpGet("detalles/{id}")]
    //Get api/usuarios/{id}
    public ActionResult<Detalles_Usuario> GetDetallesById(int id) {
        return _usuariosService.GetDetallesById(id);
    }
}