using AppProductosAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AppProductosAPI.Interfaces
{
	public interface IProductoProcesos
	{
		Task<List<Productos>> GetProductListAsync();
		Task<Productos> AddProductAsync(Productos data);
		Task<bool> DeleteProductAsync(int id_producto);
		Task<bool> UpdateProductAsync(int id_producto, Productos data);
		Task<Productos> GetProductAsync(int id_producto);

	}
}
