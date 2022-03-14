

const endPoints = ( id_producto ) => {
    return {
        getProdList: 'https://localhost:44388/api/operaciones/get/lista-productos',
        addProd: 'https://localhost:44388/api/operaciones/post/agregar-producto',
        deleteProd:`https://localhost:44388/api/operaciones/delete/${id_producto}/eliminar-producto`,
        updateProd: `https://localhost:44388/api/operaciones/actualizar/${id_producto}/actualizar-producto`,
        getProd:`https://localhost:44388/api/operaciones/get/${id_producto}/producto`
    }
}


const ListaDeProductos = async () => {

    // productos es igual al listado de productos 
    // que es retornado por el endPoint
    try {
        const listado = await fetch(endPoints().getProdList);
        const productos = await listado.json();
        if(productos)
            return productos;
        else
            throw 'Ha ocurrido un error';
    }
    catch ( error ) {
        throw error;
    }
}

const AgregarProducto = async ( producto ) => {

    const resp = await fetch( endPoints().addProd, {
        method: 'POST',
        body: JSON.stringify( producto ),
        headers: {
            'Content-Type':'application/json'
        }
    });

    const status = await resp.json();
    if(status)
        return status
    else 
        throw 'Ha ocurrido un error';
}

const EliminarProducto = async ( id_producto ) => {
    const delete_prod = await fetch( endPoints(id_producto).deleteProd, {
        method: 'DELETE',
    });

    const status = await delete_prod.json();
    if(status)
        return status;
    else
        throw "Ha ocurrido un error";

}

const ActualizarProducto = async ( id_producto, producto ) => {
    const resp = await fetch( endPoints( id_producto ).updateProd, {
        method: 'PUT',
        body: JSON.stringify( producto ),
        headers: {
            'Content-Type':'application/json'
        }
    });

    const status = await resp.json();
    if(status)
        return status
    else 
        throw 'Ha ocurrido un error';

}

const ObtenerProducto = async ( id_producto ) => {
    try {
        const getProd = await fetch(endPoints( id_producto ).getProd);
        const producto = await getProd.json();
        if(producto)
            return producto;
        else
            throw 'Ha ocurrido un error';
    }
    catch ( error ) {
        throw error;
    }
}

export {
    ListaDeProductos,
    AgregarProducto,
    EliminarProducto,
    ActualizarProducto,
    ObtenerProducto
}


