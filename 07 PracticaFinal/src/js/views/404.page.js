
import { LoadLayout } from './_layout.js';

class Pagina404 extends HTMLElement {

    connectedCallback(){
        LoadLayout();
        this.innerHTML = `
            <div class="h-min-500 d-flex align-items-center justify-content-center">
                <div class="text-center">
                    <h1 class="display-1 text-danger">
                        Error 4 0 4
                    </h1>
                    <small>
                        Lo sentimos pero parece que ha ocurrido un error
                    </small
                </div>
            </div>
        `;
    }
}

window.customElements.define('error-404', Pagina404);