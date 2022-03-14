
import { LoadLayout } from './_layout.js';
import { Router } from '@vaadin/router';
import { DetalleProductoComponent } from '../components/DetalleProducto.Component.js';

export class DetalleProductoPage extends HTMLElement {
    

    connectedCallback(){

        // obtenemos el id del producto desde el parametro
        const id_producto = this.location.params['id'];
        const producto = new DetalleProductoComponent(id_producto);

        LoadLayout();
        let loadDetails = producto.LoadProductDetail();
        this.innerHTML = `
            <div class="mb-5 text-center">
                <h3 class="mb-0"> Detalle Producto </h3>
                <p class="small mb-3 p-0">
                    Detalle del producto.
                </p>
                <a href="/productos/listado" 
                   class="rounded-pill p-2 text-white text-decoration-none shadow-sm bg-success">
                    Volver a la lista
                </a>
            </div>
            <div id="prod_detail">
                ${loadDetails}
            </div>
        `;

    }

}

window.customElements.define('detalle-prod', DetalleProductoPage);