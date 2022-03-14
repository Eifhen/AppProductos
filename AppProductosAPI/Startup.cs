using AppProductosAPI.Interfaces;
using AppProductosAPI.Models;
using AppProductosAPI.Procesos;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace AppProductosAPI
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{

			services.AddControllers();
			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo { Title = "AppProductosAPI", Version = "v1" });
			});


			// definir interfaces
			services.AddScoped<IProductoProcesos, ProcesosProductos>();

			// definiendo cadena de coneccion
			services.AddDbContext<ProductContext>(options => 
				options.UseSqlServer(Configuration.GetConnectionString("db_productos")));
			
			// definiendo cors
			services.AddCors(options => options.AddPolicy("AllowWebApp",
				builder => builder.AllowAnyOrigin()
				.AllowAnyHeader()
				.AllowAnyMethod()));
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
				app.UseSwagger();
				app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "AppProductosAPI v1"));
			}

			app.UseCors("AllowWebApp");

			app.UseHttpsRedirection();

			app.UseRouting();

			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});


		}
	}
}
