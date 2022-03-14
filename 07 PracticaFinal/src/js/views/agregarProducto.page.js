import { LoadLayout } from './_layout.js';
import { FormComponent } from '../components/Formulario.Component.js';

export class AgregarProductoPage extends HTMLElement{


    connectedCallback(){

        // inicializamos el componente
        const formulario = new FormComponent();

        // cargamos en navbar y el footer
        LoadLayout();

        // cargamos el form
        const cargarFormulario = formulario.LoadForm();
        this.innerHTML = `
            <div class="row mb-2 h-min-500">
               <div class="col-12 col-lg-6">
                    ${cargarFormulario}
               </div>
               <div class="col-12 col-lg-6">
                    <ul class="list-unstyled">
                        <li class="shadow-sm rounded p-3 mb-2 bg-white">
                            En el siguiente formulario hacemos uso del 
                            Fetch para realizar peticiones ajax a nuestra API
                        </li>
                        <li class="shadow-sm rounded p-3 mb-2 bg-white">
                            Esta pagina esta creada utilizando componentes creados
                            con Vanilla JavaScript
                        </li>
                    </ul>
               </div>
            </div>
        `;

        // eventos del form
        formulario.LoadEvents();
    }

}

window.customElements.define('form-prod', AgregarProductoPage);