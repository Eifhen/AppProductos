using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AppProductosAPI.Models
{
	[Table("Productos")]
	public class Productos
	{
		[Key]
		public int id { get; set; }

		public string nombre { get; set; }

		public string descripcion { get; set; }

	}
}
