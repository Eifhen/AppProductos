

import { ObtenerProducto } from "../http-provider/productos-provider";

export class DetalleProductoComponent {

 
    constructor( id_producto ){
        this.id_producto = id_producto;    
    }

    LoadProductDetail(){

        ObtenerProducto(this.id_producto)
        .then( producto => {
            const div = document.querySelector("#prod_detail");
            let html = `
                <div class="card col-12 col-md-8 shadow-sm bg-white border-4 border border-top-0 border-end-0 border-bottom-0 border-success">
                    <div class="card-header border-0 bg-white">
                        <h5 class="mb-0 pb-0 text-success">${producto.nombre}</h5>
                    </div>
                    <div class="card-body pt-0 ">
                        <p class="p-0 m-0 small">
                            ${producto.descripcion}
                        </p>
                    </div>
                </div>
            `;
            
            div.innerHTML = '';
            div.innerHTML = html;
        })
        .catch( error => {
            console.error(error);
            const div = document.querySelector("#prod_detail");
            let html = `
                <div class="card col-12 col-md-6 shadow-sm text-danger bg-white border border-danger border-2">
                    <div class="card-body">
                        <p class="m-0 p-0"> 
                            Ha ocurrido un error al cargar la información,
                            puede que el producto que esta buscando no exista.
                        </p>
                    </div>
                </div>
            `;
            div.innerHTML = '';
            div.innerHTML = html;
        });

    }
}