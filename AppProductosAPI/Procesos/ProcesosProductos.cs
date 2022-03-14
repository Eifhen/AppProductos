using AppProductosAPI.Interfaces;
using AppProductosAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AppProductosAPI.Procesos
{
	public class ProcesosProductos : IProductoProcesos
	{
		private readonly ProductContext BD;

		public ProcesosProductos(ProductContext contexto)
		{
			BD = contexto;
		}

		public async Task<List<Productos>> GetProductListAsync()
		{
			var listado = await BD.Producto.ToListAsync();
			return listado;
		}

		public async Task<Productos> AddProductAsync(Productos data) 
		{
			BD.Producto.Add(data);
			await BD.SaveChangesAsync();
			return data;
		}

		public async Task<bool> DeleteProductAsync(int id_producto)
		{

			var producto = await BD.Producto.FindAsync(id_producto);
			if (producto != null)
			{
				BD.Producto.Remove(producto);
				await BD.SaveChangesAsync();
				return true;
			}

			return false;
		}
		
		public async Task<bool> UpdateProductAsync(int id_producto, Productos data)
		{
			var producto = await BD.Producto.FirstOrDefaultAsync(m => m.id == data.id && m.id == id_producto);
			if (producto != null)
			{
				producto.nombre = data.nombre;
				producto.descripcion = data.descripcion;
				await BD.SaveChangesAsync();
				return true;
			}

			return false;
		}

		public async Task<Productos> GetProductAsync(int id_producto)
		{
			var producto = await BD.Producto.FindAsync(id_producto);
			if (producto != null)
				return producto;
			else
				return null;
		}

	}
}
