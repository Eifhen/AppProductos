
import {Router} from '@vaadin/router';
import '../views/introduccion.page.js'
import '../views/404.page.js';
import '../views/agregarProducto.page.js';
import '../views/listaDeProductos.page.js';
import '../views/detalleProducto.page.js';

export const RouterInit = () => {

    const outlet = document.querySelector('#main-content');
    const router = new Router(outlet);
    router.setRoutes([
    {path: '/',            component: 'introduction-view'},
    {path:'/introduction', component: 'introduction-view'},
    {path:'/formulario',   component: 'form-prod'},
    {path:'/productos/listado',     component: 'prod-list'},
    {path:'/productos/:id/:nombre', component:'detalle-prod'},
    {path: '(.*)', component: 'error-404'},
    ]);
}