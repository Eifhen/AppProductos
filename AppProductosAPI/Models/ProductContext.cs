using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppProductosAPI.Models
{
	public class ProductContext : DbContext
	{



		/*	protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
			{
				optionsBuilder.UseSqlServer(@"Server=LAPTOP-JOBSV75D;Database=productos;Trusted_Connection=True;");
			}*/

		public ProductContext(DbContextOptions<ProductContext> options) : base(options) {}

		public DbSet<Productos> Producto { get; set; }


	}
}
