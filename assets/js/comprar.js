
let btnPagar = document.querySelectorAll("#btnPagar");


 btnPagar.forEach(btn =>{
    btn.addEventListener("mouseover", ()=>{
        btn.innerHTML = "Agregar al carrito!";
    })
 });
 
 btnPagar.forEach(btn =>{
    btn.addEventListener("mouseout", ()=>{
        btn.innerHTML = "COMPRAR";
    })
 });

//------------------

let cantidadCarrito = 0;
function agregarCarrito(nombre, precio){

    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    let icono = document.getElementById("cantidad-carrito");
   

    let productoExistente = carrito.find(producto => producto.nombreProducto === nombre);

    if(productoExistente){
        productoExistente.cantidadProducto += 1;
    }else{
        let nuevoId = carrito.length > 0 ? Math.max(...carrito.map(producto => producto.idProducto)) + 1 : 1;

        let nuevoProducto = {idProducto: nuevoId, nombreProducto: nombre, precioProducto: precio, cantidadProducto: 1};
        carrito.push(nuevoProducto);
        cantidadCarrito++;
        icono.textContent = cantidadCarrito;
       
    }

    sessionStorage.setItem("carrito", JSON.stringify(carrito));
   
    actualizarCarrito();
   
}



function actualizarCarrito(){
    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    let listaProductos = document.getElementById("lista-productos");
    let listaPrecios = document.getElementById("lista-precios");
    let totalCarrito = document.getElementById("total");


    listaPrecios.innerHTML = "";
    listaProductos.innerHTML = "";

    let total = 0;
    

    for (let i=0; i<carrito.length; i++) {

      let producto = carrito[i];


      let liProducto = document.createElement('li');
      liProducto.innerHTML = `${producto.nombreProducto}<button class="botonMenos" data-id="${producto.idProducto}">-</button>
      <button class="botonCantidad">${producto.cantidadProducto}</button>
      <button class="botonMas" data-id="${producto.idProducto}">+</button>`;

      listaProductos.appendChild(liProducto);



      let liPrecio = document.createElement('li');
      liPrecio.textContent = producto.precioProducto;
      listaPrecios.appendChild(liPrecio);

      total += producto.precioProducto * producto.cantidadProducto;
    }

    totalCarrito.textContent = `Total  ${total}`;


    document.querySelectorAll(".botonMenos").forEach(btn => {
        btn.addEventListener("click", disminuirCantidad);
    });
    document.querySelectorAll(".botonMas").forEach(btn => {
        btn.addEventListener("click", aumentarCantidad);
    });
}



function disminuirCantidad(event) {
    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    let idProducto = parseInt(event.target.getAttribute("data-id"));

    let producto = carrito.find(p => p.idProducto === idProducto);
    if (producto && producto.cantidadProducto > 1) {
        producto.cantidadProducto -= 1; // Disminuir cantidad
    } else {
        carrito = carrito.filter(p => p.idProducto !== idProducto); // Eliminar producto si cantidad llega a 0
    }

    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito(); // Refrescar la vista
}

function aumentarCantidad(event) {
    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    let idProducto = parseInt(event.target.getAttribute("data-id"));

    let producto = carrito.find(p => p.idProducto === idProducto);
    if (producto) {
        producto.cantidadProducto += 1; // Aumentar cantidad
    }

    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito(); // Refrescar la vista
}





document.addEventListener("DOMContentLoaded", () => {
    actualizarCarrito();
   
});




document.getElementById("btnComprar").addEventListener("click", ()=>{
    confirm("Quieres confirmar la compra?");
    window.location.href = "resumen.html";
})