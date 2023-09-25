// obtener en carrito (js 2)
let botonBorrarCarrito = document.getElementById("borrar-Carrito");
let iconoCarrito = document.getElementById("iconoCarrito");
// let botonBorrarItem = document.getElementById("borrar-Item");
let precioTotalCarrito = document.getElementById("precio-total");
let carritoArrayInicial = JSON.parse(sessionStorage.getItem("carrito"));
let sumatoriaTotal = 0;

let borrarItem = function (id) {
  let carritoArray = JSON.parse(sessionStorage.getItem("carrito"));
  let carritoFiltrado = carritoArray.filter((elem) => {
    return elem.id != id;
  });
  sessionStorage.setItem("carrito", JSON.stringify(carritoFiltrado));
  if (!JSON.parse(sessionStorage.getItem("carrito")).length) {
    sessionStorage.clear();
  }
  window.location.reload();
};
carritoArrayInicial.forEach((obj, i) => {
  let div = document.createElement("div");
  let section = document.getElementById("div1");
  sumatoriaTotal = sumatoriaTotal + obj.precioTotal;
  div.innerHTML = `<div class="div--precio-numero">
  <div class="display-flex">
  <div class="div-img-products">
  <img
  class="img-width-height"
  src="https://rodando.alwaysdata.net/bicicleta-1.png"
  />
  </div>
  <div class="div-container-products">
  <div class="p-titulo-tipo-rodado">
  <h2>${obj.tituloRodado}</h2>
  </div>
  <div class="div-horas-cantidad" >
  <p class="p-horas-cantidad horas">Horas contratadas: </p>
  <p>${obj.cantidadHoras}hs</p>
  </div>
  <div class="div-vehiculo-cantidad">
  <p class="p-horas-cantidad cantidad">Vehículos contratados: </p>
  <p> ${obj.cantidadRodado}</p>
  </div>
  </div>
  </div>
  <div class="producto-datos-inputs-seleccion">
  <div class="precio">
    <label>$${obj.precioTotal}</label>
    </div>
    <div class="botones">
    <button onclick="borrarItem(${obj.id})"><i class="fa-solid fa-trash-can"></i></button>
    <button>
    <a href="paginaDeReserva">
    <i class="fa-solid fa-pen-to-square"></i>
    </a>
    </button>
    </div>
    </div>
    </div>`;
  section.appendChild(div);
});

precioTotalCarrito.innerHTML = sumatoriaTotal;

// Borrado de carrito completo

botonBorrarCarrito.addEventListener("click", function () {
  sessionStorage.clear();
  window.location.reload();
});
