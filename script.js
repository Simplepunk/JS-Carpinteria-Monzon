AOS.init();
let carrito=JSON.parse(localStorage.getItem("carrito"))||[];
let lista=document.getElementById("lista");

//LUXON
const DateTime=luxon.DateTime;
const inicio=DateTime.now();
console.log(inicio.toString());
console.log(inicio.toLocaleString(DateTime.DATE_FULL));   

//llamada a renderizar
renderizarProductos();

function renderizarProductos() {
    for (const producto of productos) {
        lista.innerHTML+=`<li data-aos="flip-right" class="col-sm-3 list-group-item">
            <h5> ID: ${producto.id} </h5>
            <img src=${producto.foto} width="250" height="450">
            <p> Producto: ${producto.nombre}</p>
            <p><strong> $ ${producto.precio}</strong></p>
            <button class='btn btn-danger' id='btn${producto.id}'>Comprar</button>
        </li>`;
    }
    //eventos boton
    productos.forEach(producto =>{
        //evento individual para cada boton
        document.getElementById(`btn${producto.id}`).addEventListener("click",function(){
            agregarAlCarrito(producto);
        });
    })
}

function agregarAlCarrito(productoNuevo) {
    carrito.push(productoNuevo);
    console.log(carrito);
    //alert("producto: "+productoNuevo.nombre+" agregado al carro!")
    Swal.fire(
        "Producto: "+productoNuevo.nombre,
        "Agregado al carrito",
        "success"
    );
    document.getElementById("tablabody").innerHTML+=`
    <tr>
        <td>${productoNuevo.id}</td>
        <td>${productoNuevo.nombre}</td>
        <td>${productoNuevo.precio}</td>
    </tr>`;
    localStorage.setItem("carrito",JSON.stringify(carrito));
}

let finalizar=document.getElementById("finalizar");
finalizar.onclick=()=>{
    Swal.fire({
        title: 'Pedido confirmado!',
        text: 'Estamos preparando todo para el envío.',
        imageUrl: '/imgs/compra.png',
        imageWidth: 204,
        imageHeight: 60,
        imageAlt: 'ok',
    });

    //Toastify - - 
    Toastify({
        text:"¡Gracias por tu compra!",
        duration:2500,
        gravity:"top",
        position:"center"
    }).showToast();

    //Luxon - cerrando compra -
    const fin=DateTime.now();
    const Interval=luxon.Interval;
    const tiempo=Interval.fromDateTimes(inicio,fin);
    console.log("Tardaste "+tiempo.length('minutes')+" minutos en cerrar la compra!");
}