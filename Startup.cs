using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Newtonsoft.Json;
using ungDbWebApi.Data;
using ungDbWebApi.Services;

namespace ungDbWebApi;

public class Startup
{
    private readonly string TicketsCORSPolicy = "_ticketsCORSPolicy";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Configuration.GetConnectionString("ungDbContext");
            //HACE LA CONEXION CON LA BASE DE DATOS PUESTA EN APPSETTINGS.JSON (si el archivo no existe lo crea
            services.AddDbContext<ungDbContext>(options =>
                options.UseSqlite(connectionString));


            //AQUI SE COLOCAN LAS URL QUE ACEPTARA EL CORS
            services.AddCors(options => {
                options.AddPolicy(TicketsCORSPolicy,
                    builder => {
                        builder.WithOrigins(
                                "https://localhost:5001",
                                "https://localhost:5000",
                                "http://localhost:5000")
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });
            
            //AQUI SE COLOCAN LOS SERVICES QUE SE USARAN
            services.TryAddScoped<UsuariosService>();
            services.TryAddScoped<ProyectosService>();
            services.TryAddScoped<ActividadesProyectoService>();
            services.TryAddScoped<DiagramasGanttService>();
            services.TryAddScoped<ActividadesGanttService>();
            services.TryAddScoped<HorariosService>();
            services.TryAddScoped<ActividadesHorarioService>();
            services.TryAddScoped<TablerosKanbanService>();
            services.TryAddScoped<TarjetasKanbanService>();
            services.TryAddScoped<ActividadesKanbanService>();
            
            
            services.AddControllers().AddNewtonsoftJson(opt => {
                    opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                    opt.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                });
            
            //Add Swagger services
            services.AddSwaggerDocument(config => {
                config.PostProcess = document => {
                    document.Info.Version = "v1";
                    document.Info.Title = "WebApi de Sistema";
                    document.Info.Description = "WebAPI para sistema de tareas.";
                    document.Info.TermsOfService = "None";
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            //ESTO HACE QUE EL PROYECTO USE LOS CORS
            app.UseCors(TicketsCORSPolicy);
            
            app.UseOpenApi(); //Swagger specification json: http://localhost:<port>/swagger/v1/swagger.json
            app.UseSwaggerUi3();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
}