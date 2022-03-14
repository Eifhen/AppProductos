
import { AgregarProducto } from "../http-provider/productos-provider";
import { Router } from '@vaadin/router';

export class FormComponent {
    
    constructor () {}

    LoadForm () {

        const html = `
            <div class="card border-0 shadow-sm  p-3 mx-auto">
                <div class="card-header pb-3 bg-white text-center">
                    <h3 class="mb-0 display-6"> Formulario </h3>
                    <small>Ingresa el nombre y la descripción del producto</small>
                </div>
                <div class="card-body pt-5">
                    <form id="form-addProd" action="" method="">
                        <div class="form-group mb-3">
                            <label for="nombre" class="mb-1 fw-normal">
                                Nombre Producto
                            </label>
                            <input class="form-control col-12" type="text" id="nombre" name="nombre" >
                        </div>
                        <div class="form-group mb-3">
                            <label class="mb-1 fw-normal" for="descripcion">
                                Descripción
                            </label>
                            <textarea class="form-control" name="descripcion" id="descripcion" cols="30" rows="5">

                            </textarea>
                        </div>
                    
                        <button id="btn_addProd" type="submit" class="form-control btn btn-success rounded-pill shadow-sm">
                            <span id="spinner" class="d-none spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span id="addProd">Agregar Producto<span>
                        </button>
                    </form>
                </div>
            </div>
        `;
        
        return html;
    }

     // eventos del form
    LoadEvents () {
        const btn_addProd = document.querySelector("#btn_addProd");
        const input_nombre = document.querySelector("#nombre");
        const input_descripcion = document.querySelector("#descripcion");
        const form_addProd = document.querySelector("#form-addProd");
        const spinner = document.querySelector("#spinner");

        input_descripcion.textContent = '';
        input_nombre.textContent = '';

        btn_addProd.addEventListener("click", () => {

            let formSerialize = {};
            const formData = new FormData(form_addProd);

            // serializamos el form. para esto pasamos el valor y el nombre
            // de cada uno de sus inputs a un objeto
            // luego enviamos el objeto 'formSerialize' a la promesa AgregarProducto
            // luego en el interior de la promesa convertiremos el objeto a un json.

            for (let [key, value] of formData) {
                formSerialize[key] = value;
            }

            btn_addProd.classList.add("disabled");
            btn_addProd.disabled = true;
            spinner.classList.remove("d-none");
           

            // enviamos el formulario serializado
            AgregarProducto(formSerialize).then( respo => {
                console.log(respo);
                // btn_addProd.classList.remove("disabled");
                // btn_addProd.disabled = false;
                //spinner.classList.add("d-none");
                
                // direccionamos al listado de productos
                Router.go("/productos/listado");

            }).catch( error => {
                console.error(error);
                alert(error);
                btn_addProd.classList.remove("disabled");
                btn_addProd.disabled = false;
                spinner.classList.add("d-none");
            });

        })
    
    }

}

