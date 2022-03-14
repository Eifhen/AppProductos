
import { ListaDeProductos, EliminarProducto, ActualizarProducto } from "../http-provider/productos-provider";
import { Router } from '@vaadin/router';

export class TableComponent {

    // Cargar Tabla
    LoadTable(){

        const table = `
            <div class="table-responsive">
                <table id="prod_tbl" class="table ">
                    <thead>
                        <tr>
                            <th scope="col">#ID</th>
                            <th scope="col">Producto</th>
                            <th scope="col">
                                Descripción
                            </th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="prod_tbody"></tbody>
                </table>
            </div>
        `;

        return table;
    }

    // Cargar Filas de la tabla
    LoadRows() {
        //const table = document.querySelector("#prod_tbl");
        const tbody = document.querySelector("#prod_tbody");
        const spinner = document.querySelector("#tbl_spinner");
        tbody.innerHTML = '';

        // spinner 
        spinner.classList.remove("d-none");

        // cargamos las filas de la tabla
        ListaDeProductos()
        .then( productos => {

            console.log(productos);
            spinner.classList.add("d-none");
            if(productos.length > 0)
            {   
                let row_count = 1;
                for(let producto of productos){

                    const  trow = document.createElement("tr");
                    const html = `
                        <td class="font-weight-bold"> 
                            ${producto.id}
                        </td>
                        <td class="text-truncate text-break" style="max-width: 100px"> 
                            ${producto.nombre}
                        </td>
                        <td class="text-truncate text-break" style="max-width: 300px">
                            ${producto.descripcion} 
                        </td>
                        <td>
                            <button class="border-0 rounded-pill text-dark btn btn-warning" 
                                    type="button">
                                Editar
                            </button>
    
                            <button class="border-0 rounded-pill btn btn-danger" 
                                    type="button">
                                Eliminar
                            </button>

                            <button class="border-0 rounded-pill btn btn-success" 
                                    type="button">
                                Detalle
                            </button>
                        </td>
                    `;
            
                    trow.innerHTML = html;
                    trow.setAttribute("row_index", row_count++);
                    trow.setAttribute("data-info", producto.id);
                    tbody.append(trow);
                }

                this.LoadTableEvents();
            }
            else {
                this.MsgEmptyTable(true);
            }
            
        })
        .catch( error => {
            console.error( "error => ",error );
            this.MsgEmptyTable( false );
        });

    }

    // Cargar Eventos de la tabla {eliminar y editar}
    LoadTableEvents(){

        // utilizamos el atributo 'row_index' para marcar las filas de la tabla
        // cuando pulsamos el boton eliminar, eliminamos la fila que se encuentra
        // en el indice correspondiente.

        // toast
        const tbl_toast = document.querySelector("#toast");
        const toast_msg = document.querySelector("#toast-msg");
        let toast = new bootstrap.Toast(tbl_toast);
        
        // table
        const tbl = document.querySelector("#prod_tbl");
        let tblRows = document.querySelectorAll("[row_index]");
        let row_counter = 1; 
         
        for(let row of tblRows){

            // botones
            let btn_edt = row.children[3].children[0];
            let btn_dlt = row.children[3].children[1];
            let btn_detalle = row.children[3].children[2];            
            row_counter++;

            // delete event
            btn_dlt.addEventListener("click",()=>{
                
                let id_prod = row.getAttribute("data-info");
                
                EliminarProducto(id_prod)
                .then( response => {
       
                    // info
                    let row_index = row.getAttribute("row_index"); // obtener indice de la fila a eliminar
                    tbl.deleteRow(row_index); // eliminar fila en el indice indicado
                    row_counter--;

                    // Reordenar Indices de la tabla
                    let indice = 0; 
                    for(let fila of tbl.rows){
                        fila.setAttribute("row_index",indice);
                        indice++;
                    }

                    console.log(response);
                    toast_msg.textContent = response.message;
                    toast.show();
    
                })
                .catch( error => {
                    console.warn(error); 
                })
                .finally(()=>{
                    if(row_counter <= 1) {
                        this.MsgEmptyTable(true);
                    }
                });     

            });

            // edit event
            btn_edt.addEventListener("click",()=>{

                let id_prod = row.getAttribute("data-info");
                let nombre_prod = row.children[1];
                let descrip_prod = row.children[2];
                this.CreateModal();
                this.LoadModal(id_prod, nombre_prod, descrip_prod);
            })

            // detalle event
            btn_detalle.addEventListener("click",()=>{
                // utilizamos una expresion regular en el replace para
                // reemplazar cualquier espacio en blanco por un guion.
                let id_prod = row.getAttribute("data-info");       
                let nombre_prod = row.children[1].innerText.replace(/\s/g,"-").toLowerCase();
                Router.go(`/productos/${id_prod}/${nombre_prod}`);
            })
        }     
    }

    // Creamos el modal para editar contenido
    CreateModal() {

        const div = document.querySelector("#modal_div");
        div.innerHTML = '';
        div.innerHTML = `
        <div id="modal" class="modal fade" tabindex="-1" data-bs-backdrop="static">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header border-0">
                    <div>
                        <h6 id="modal_title" class="modal-title p-0 m-0"></h6>
                        <p id="modal_info" class="small p-0 m-0"></p>
                    </div>
                    </div>
                    <div id="modal_content" class="modal-body"></div>
                    <div class="modal-footer border-0">
                        <button id="modal_close" type="button" class="btn btn-light rounded-pill" data-bs-dismiss="modal">Cerrar</button>
                        <button id="modal_btn" type="button" class="btn btn-success rounded-pill">
                            <span id="spinner" class="d-none spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Actualizar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `
    }

    // Cargamos la informacion del modal y el evento para actualizar 
    LoadModal(id_prod, nombre_prod, descrip_prod) {

        /************************************
        Nota: 
        nombre_prod y descrip_prod contienen las celdas [1] y [2]
        de la fila seleccionada. recibimos por parametro la celda en si
        debemos aplicar el innerText si queremos extraer el texto de la celda.
        **********************************/

        // toast
        const tbl_toast = document.querySelector("#toast");
        const toast_msg = document.querySelector("#toast-msg");
        let toast = new bootstrap.Toast(tbl_toast);
        
        // modals
        let spinner = document.querySelector("#spinner");
        let tbl_modal = document.querySelector("#modal");
        let modal_title = document.querySelector("#modal_title");
        let modal_content = document.querySelector("#modal_content");
        let modal_info = document.querySelector("#modal_info");
        let modal_btn = document.querySelector("#modal_btn");
        let modal_close = document.querySelector("#modal_close");
        let modal = new bootstrap.Modal(tbl_modal);

        spinner.classList.add("d-none");
        modal_close.classList.remove("disabled");
        modal_close.disabled = false;
        modal_btn.disabled = false;
        modal_btn.classList.remove("disabled");
        modal_content.innerHTML = '';
        modal_title.innerText = "Actualizar Producto." 
        modal_info.innerText = "Pulsa el boton actualizar para realizar la operacion."

        this.LoadModalForm(id_prod, nombre_prod, descrip_prod);
      
        // Evento modal btn
        modal_btn.addEventListener("click",()=>{

            modal_btn.disabled = true;
            modal_btn.classList.add("disabled");
            spinner.classList.remove("d-none");
            modal_close.classList.add("disabled");
            modal_close.disabled = true;
            modal.hide();
            
            // serializar formulario
            let formSerialize = {};
            let form_id = document.querySelector("#modal_form");
            let formData = new FormData(form_id);
            for (let [key, value] of formData) {
                formSerialize[key] = value;
            }
    
            ActualizarProducto(id_prod, formSerialize)
            .then(response => {
                // actualizamos el texto en las celdas correspondientes de la tabla
                let inputNombre = document.querySelector("#nombre");
                let inputDescripcion = document.querySelector("#descripcion");
                nombre_prod.innerText = inputNombre.value;
                descrip_prod.innerText = inputDescripcion.value;
                modal.hide();
                toast_msg.textContent = response.message;
                toast.show();
            })
            .catch(error => {
                console.log(error);
                modal.hide();
                toast_msg.textContent = "Ha ocurrido un error al actualizar el registro";
                toast.show();
            })
        })

        modal.show();
    }

    // Creamos el form que utilizaremos dentro del modal
    LoadModalForm( id_prod, nombre_prod, descrip_prod ){

         // crear form
         let form = document.createElement("form");
         form.id = "modal_form";
         form.method = "post";
 
         // label id_prod
         let lbl_id_prod = document.createElement("small");
         lbl_id_prod.innerText = `ID Prducto: ${id_prod}`;
         lbl_id_prod.classList.add("fst-italic");
 
         let inputHidden = document.createElement("input");
         inputHidden.value = id_prod;
         inputHidden.type = "hidden";
         inputHidden.id = "id"
         inputHidden.name = "id";
 
         // input nombre
         let inputNombre = document.createElement("input");
         inputNombre.type="text";
         inputNombre.value = nombre_prod.innerText;
         inputNombre.id = "nombre";
         inputNombre.name="nombre";
         inputNombre.classList.add("form-control","form-control-sm");
         
         // textArea descripcion
         let textareaDescrip = document.createElement("textarea");
         textareaDescrip.value = descrip_prod.innerText;
         textareaDescrip.rows = 5;
         textareaDescrip.id="descripcion";
         textareaDescrip.name = "descripcion";
         textareaDescrip.classList.add("form-control","form-control-sm","mt-2");
 
         form.appendChild(inputNombre);
         form.appendChild(inputHidden);
         form.appendChild(textareaDescrip);
         form.appendChild(lbl_id_prod);
         modal_content.append(form);
    }

    // Mensajes tanto cuando la tabla esta vacia como cuando hay algun error al cargar la tabla
    MsgEmptyTable( estado ) {
        const tbl_msg = document.querySelector("#tbl_msg");
        const spinner = document.querySelector("#tbl_spinner");

        if( estado ) {
            // empty table
            tbl_msg.classList.remove("d-none","alert-danger");
            tbl_msg.classList.add("alert-info");
            tbl_msg.innerText = 'Por el momento no hay información disponible.';
        }
        else {
            // load table fail
            spinner.classList.add("d-none");
            tbl_msg.classList.remove("d-none", "alert-info");
            tbl_msg.classList.add("alert-danger");
            tbl_msg.innerText = 'Ha ocurrido un error, no se ha podido cargar la tabla.';
        }
    }

}