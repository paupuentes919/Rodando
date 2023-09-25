window.addEventListener("load", function () {
  // Captura de los inputs y botones
  let tituloRodado = document.getElementById("titulo-rodado");
  let precioUnitario = document.getElementById("precio-unitario");
  let btnCarrito = document.getElementById("btn-carrito");
  let cantidadRodados = document.getElementById("cantidad-rodados");
  let cantidadHoras = document.getElementById("cantidad-horas");
  // let datepicker = document.getElementById("#datepicker");

  btnCarrito.addEventListener("click", function () {
    let objCarrito = {
      tituloRodado: tituloRodado.innerText,
      cantidadRodado: cantidadRodados.value,
      precioUnitario: precioUnitario.innerText,
      cantidadHoras: cantidadHoras.value,
      precioTotal:
        precioUnitario.innerText * cantidadHoras.value * cantidadRodados.value,
    };

    let carritoArray = [];

    if (sessionStorage.getItem("carrito")) {
      carritoArray = JSON.parse(sessionStorage.getItem("carrito"));
    }

    carritoArray.push(objCarrito);
    console.log(objCarrito);
    sessionStorage.setItem("carrito", JSON.stringify(carritoArray));
  });
});
