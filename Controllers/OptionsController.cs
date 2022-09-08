using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ungDbWebApi.Data;

namespace ungDbWebApi.Controllers;
[Route("api/options")]
[ApiController]
public class OptionsController
{
    private readonly ungDbContext _db;
        
    public OptionsController(ungDbContext db)
    {
        _db = db;
    }
    
    [HttpGet("inicia")]
    public string IniciaTablas()
    {
        string query;
        
        //Usuarios
        query = "Create table if not exists Usuarios ( " +
                "id_usuario         INT primary key NOT NULL, " +
                "nombre_completo    VARCHAR(200), " +
                "nombre_usuario     VARCHAR(200), " +
                "fecha_registro     DATETIME, " +
                "contrasena         VARCHAR(200) " +
                ");";
        _db.Database.ExecuteSqlRaw(query);
        
        //Proyectos
        query = "Create table if not exists Proyectos ( " +
                "id_proyecto            INT primary key NOT NULL, " +
                "id_usuario             INT, " +
                "nombre_proyecto        VARCHAR (200), " +
                "ultima_modificacion    DATETIME, " +
                "fecha_creacion         DATETIME " +
                ");";
        _db.Database.ExecuteSqlRaw(query);

        query = "CREATE TABLE if not exists Actividades_Proyecto ( " +
                "id_actividad_proyecto INT primary key NOT NULL, " +
                "id_proyecto           INT, " +
                "nombre_actividad      VARCHAR (200), " +
                "estatus_actividad     VARCHAR (200), " +
                "categoria_actividad   VARCHAR (200), " +
                "fecha_actividad       DATETIME " +
                ");";
        _db.Database.ExecuteSqlRaw(query);
        
        //Diagramas Gantt
        query = "CREATE TABLE if not exists Diagramas_Gantt ( " +
                "id_diagrama         INT primary key NOT NULL, " +
                "id_usuario          INT, " +
                "nombre_diagrama     VARCHAR (200), " +
                "fecha_creacion      DATETIME, " +
                "ultima_modificacion DATETIME " +
                ");";
        _db.Database.ExecuteSqlRaw(query);

        query = "CREATE TABLE if not exists Actividades_Gantt ( " +
                "id_actividad_gantt INT primary key NOT NULL, " +
                "id_diagrama        INT, " +
                "descripcion        VARCHAR (200), " +
                "fecha_inicial      DATETIME, " +
                "fecha_final        DATETIME " +
                ");";
        _db.Database.ExecuteSqlRaw(query);
        
        //Horarios
        query = "CREATE TABLE if not exists Horarios ( "+
                "id_horario          INT primary key NOT NULL, " +
                "id_usuario          INT, " +
                "nombre_horario      VARCHAR (200), " +
                "fecha_creacion      DATETIME, " +
                "ultima_modificacion DATETIME " +
                ");";
        _db.Database.ExecuteSqlRaw(query);

        query = "CREATE TABLE if not exists Actividades_Horario ( " +
                "id_actividad_horario INT primary key NOT NULL, " +
                "id_horario           INT, " +
                "descripcion          VARCHAR (200), " +
                "hora                 VARCHAR (200), " +
                "frecuencia           INT " +
                ");";
        _db.Database.ExecuteSqlRaw(query);
        
        //Tablero kanban
        query = "CREATE TABLE if not exists Tableros_Kanban ( " +
                "id_tablero          INT primary key NOT NULL, " +
                "id_usuario          INT, " +
                "nombre_tablero      VARCHAR (200), " +
                "ultima_modificacion DATETIME, " +
                "fecha_creacion      DATETIME " +
                ");";
        _db.Database.ExecuteSqlRaw(query);

        query = "CREATE TABLE if not exists Tarjetas_Kanban ( " +
                "id_tarjeta INT primary key NOT NULL, " +
                "id_tablero INT, " +
                "titulo     VARCHAR (200) " +
                ");";
        _db.Database.ExecuteSqlRaw(query);

        query = "CREATE TABLE if not exists Actividades_Kanban ( " +
                "id_actividad_kanban INT primary key NOT NULL, " +
                "id_tarjeta          INT, " +
                "descripcion         VARCHAR (200), " +
                "prioridad           VARCHAR (200), " +
                "categoria           VARCHAR (200) " +
                ");";
        _db.Database.ExecuteSqlRaw(query);
        
        //Detalles Usuario
        query = "CREATE VIEW if not exists Detalles_Usuario As "+
                "Select "+
                        "u.id_usuario, "+
                        "(Select count(id_usuario) from Proyectos where id_usuario=u.id_usuario) as numero_proyectos, "+
                        "(Select count(id_usuario) from Horarios where id_usuario=u.id_usuario) as numero_horarios, "+
                        "(Select count(id_usuario) from Tableros_Kanban where id_usuario=u.id_usuario) as numero_tableros, "+
                        "(Select count(id_usuario) from Diagramas_Gantt where id_usuario=u.id_usuario) as numero_gantt "+
                "From Usuarios u";
        _db.Database.ExecuteSqlRaw(query);
        
        
        return "Tablas creadas";
    }
}