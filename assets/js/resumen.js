


const carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

let total = 0;

function resumenCarrito(){
    let listaProductos = document.getElementById("productosResumen");
    let listaCantidad = document.getElementById("cantidadProductos");
    let totalCompra = document.getElementById("totalCompra");

    listaCantidad.innerHTML = "";
    listaProductos.innerHTML = "";

    
    


    for(let i=0;i<carrito.length;i++){
        let producto = carrito[i];

        let liProducto = document.createElement("li");
        liProducto.innerHTML = `${producto.nombreProducto}, ${producto.precioProducto}`;

        listaProductos.appendChild(liProducto);

        let liCantidad = document.createElement("li");
        liCantidad.innerHTML = `${producto.cantidadProducto}`;

        listaCantidad.appendChild(liCantidad);

        total += producto.precioProducto;

    }

    totalCompra.textContent = `Total: ${total}`;
}


resumenCarrito();