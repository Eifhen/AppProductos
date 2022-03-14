using AppProductosAPI.Interfaces;
using AppProductosAPI.Models;
using AppProductosAPI.Procesos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace AppProductosAPI.Controllers
{
	//[Route("api/[controller]")]
	[ApiController]
	public class OperacionesController : ControllerBase
	{
		private readonly IProductoProcesos procesos;

		public OperacionesController(IProductoProcesos procesos)
		{
			this.procesos = procesos;
		}

		

		[Route("api/operaciones/get/lista-productos")]
		[HttpGet]
		public async Task<IActionResult> ListaProductos()
		{
			try
			{
				var listado = await procesos.GetProductListAsync();
				return Ok(listado);
			}
			catch (Exception err)
			{
				return BadRequest(err.Message);
			}
		}


		[Route("api/operaciones/post/agregar-producto")]
		[HttpPost]
		public async Task<IActionResult> AgregarProducto([FromBody] Productos data)
		{
			try
			{
				var agregar = await procesos.AddProductAsync(data);
				return Ok(agregar);
			}
			catch (Exception err)
			{
				return BadRequest(err.Message);
			}
		}


		[Route("api/operaciones/delete/{id_producto}/eliminar-producto")]
		[HttpDelete]
		public async Task<IActionResult> EliminarProducto(int id_producto)
		{
			try
			{
				var eliminar_producto = await procesos.DeleteProductAsync(id_producto);
				if (eliminar_producto)
				{
					return Ok(new { message = "El elemento fue eliminado con exito." });
				}
				else
				{
					return NotFound();
				}
			}
			catch (Exception error)
			{
				return BadRequest(error.Message);
			}
		}


		[Route("api/operaciones/actualizar/{id_producto}/actualizar-producto")]
		[HttpPut]
		public async Task<IActionResult> ActualizarProducto(int id_producto, [FromBody] Productos data)
		{

			try
			{
				var producto = await procesos.UpdateProductAsync(id_producto, data);
				if (producto)
				{
					return Ok(new { message = "El elemento fue actualizado con exito." });
				}

				return NotFound();
			}
			catch (Exception err)
			{
				return BadRequest(err.Message);
			}
		}


		[Route("api/operaciones/get/{id_producto}/producto")]
		[HttpGet]
		public async Task<IActionResult> ObtenerProducto(int id_producto)
		{
			try
			{
				var producto = await procesos.GetProductAsync(id_producto);
				if (producto != null)
					return Ok(producto);
				else
					return NotFound();
			}
			catch (Exception err)
			{
				return BadRequest(err.Message);
			}
		}



	}
}
