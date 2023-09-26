window.addEventListener("load", function () {
  // Captura de los inputs y botones
  let tituloRodado = document.getElementById("titulo-rodado");
  let precioUnitario = document.getElementById("precio-unitario");
  let btnCarrito = document.getElementById("btn-carrito");
  let cantidadRodados = document.getElementById("cantidad-rodados");
  let cantidadHoras = document.getElementById("cantidad-horas");
  let imgProducto = document.getElementById("imagen-producto");
  // let datepicker = document.getElementById("#datepicker");

  btnCarrito.addEventListener("click", function () {
    let carrito = JSON.parse(sessionStorage.getItem("carrito"));
    let maxId = 0;
    if (carrito && carrito.length > 0) {
      let ids = carrito.map((elem) => elem.id);
      maxId = Math.max(...ids) + 1;
    }
    let nuevoItem = {
      id: maxId,
      imagen: imgProducto.src,
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

    carritoArray.push(nuevoItem);
    sessionStorage.setItem("carrito", JSON.stringify(carritoArray));
    Swal.fire({
      icon: "success",
      title: "Tu alquiler ha sido realizado",
      showConfirmButton: false,
      width: "50rem",
      timer: 2500,
    });
  });
});
