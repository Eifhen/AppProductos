

import { LoadLayout } from './_layout.js';


class PaginaIntroduccion extends HTMLElement {

    connectedCallback(){
        LoadLayout();
        this.innerHTML = `
            <div class="h-min-500 mt-5 pt-3">
                <h3>Introducción</h3>
                <p class="small">
                    Esta App es una aplicacion web de tipo SPA (Single Page Aplication)
                    creada utilizando JavaScript puro (no frameworks) en la misma podremos
                    realizar un CRUD sencillo agregando, eliminando, editando y listando productos.
                    Esta app fue realizada utilizando implementando componentes creados con JavaScript
                    puro. 
                </p>
               <div class="col-12 col-md-6">
                    <span class="fw-bold small"> 
                        Las tecnologias utilizadas en esta practica son las siguientes:
                    </span>
                    <ul class="mt-3 list-unstyled">
                        <li class="shadow-sm rounded bg-white p-3 mb-2">
                            Boostrap 5
                        </li>
                        <li class="shadow-sm rounded bg-white p-3 mb-2">
                            JavaScript ES6+
                        </li>
                        <li class="shadow-sm rounded bg-white p-3 mb-2">
                            WebPack
                        </li>
                        <li class="shadow-sm rounded bg-white p-3 mb-2">
                            Sql Server
                        </li>
                        <li class="shadow-sm rounded bg-white p-3">
                            Web API con ASP.NET CORE
                            </li>
                        <li class="shadow-sm rounded bg-white p-3">
                            Vaadin Router (Como router para realizar el enrutamiento de la app)
                        </li>
                    </ul>
               </div>
            </div>
        `;
    }
}

window.customElements.define('introduction-view', PaginaIntroduccion);