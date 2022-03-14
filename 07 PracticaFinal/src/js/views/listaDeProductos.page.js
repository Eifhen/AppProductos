import { LoadLayout } from './_layout.js';
import { TableComponent } from '../components/Table.Component.js';

export class ListadoProductoPage extends HTMLElement{

    tableComponent = '';

    constructor(){
        super();
        this.tableComponent = new TableComponent();
    }

    connectedCallback(){

        // cargamos en navbar y el footer
        LoadLayout();

        // cargamos la tabla
        let table = this.tableComponent.LoadTable();
        this.innerHTML = `
            <div class="h-min-500">
                <div class="mb-4">
                    <h3 class="mb-0"> Listado de productos </h3>
                    <p class="small m-0 p-0">
                        Listado de productos obtenidos desde nuestra API.
                    </p>
                    </br>  
                    <a href="/formulario" class="rounded-pill p-2 text-white text-decoration-none shadow-sm bg-success">
                        Agregar Producto
                    </a>
                </div>
                <div>
                    ${table}
                    <span id="tbl_msg" class="form-control d-none text-center alert alert-danger p-2"></span>
                    <div id="tbl_spinner" class="text-center d-none p-3">
                        <div class="spinner-border text-secondary " style="width: 3rem; height: 3rem;" role="status"></div>
                    </div>
                   
                </div>
            </div>
        `;

        // cargamos las filas de la tabla
        this.tableComponent.LoadRows();
        
    }

}


window.customElements.define('prod-list', ListadoProductoPage);