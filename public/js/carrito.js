window.addEventListener("load", function () {
  //DETALLE
  // Captura del titulo, precio y boton
  let tituloRodado = document.querySelector("#titulo-rodado").innerText;
  let precioUnitario = document.querySelector("#precio-unitario").innerText;
  let btnCarrito = document.querySelector("#btn-carrito");

  let tituloRodadoCarrito = document.querySelector("#titulo-rodado-carrito");

  // Guardar en SessionStorage cuando se hace click en el btn del carrito
  btnCarrito.addEventListener("click", function () {
    //Captura de los inputs
    let cantidadRodados = document.querySelector("#cantidad-rodados").value;
    let cantidadHoras = document.querySelector("#cantidad-horas").value;

    //titulo
    let tituloRodadoOldData;
    if (sessionStorage.getItem("tituloRodado") == null) {
      sessionStorage.setItem("tituloRodado", []);
      tituloRodadoOldData = [];
    } else {
      tituloRodadoOldData = JSON.parse(sessionStorage.getItem("tituloRodado"));
    }
    tituloRodadoOldData.push(tituloRodado);
    sessionStorage.setItem("tituloRodado", JSON.stringify(tituloRodadoOldData));

    //precio
    let precioUnitarioOldData;
    if (sessionStorage.getItem("precioUnitario") == null) {
      sessionStorage.setItem("precioUnitario", []);
      precioUnitarioOldData = [];
    } else {
      precioUnitarioOldData = JSON.parse(
        sessionStorage.getItem("precioUnitario"),
      );
    }
    precioUnitarioOldData.push(precioUnitario);
    sessionStorage.setItem(
      "precioUnitario",
      JSON.stringify(precioUnitarioOldData),
    );

    //cantidad
    let cantidadRodadosOldData;
    if (sessionStorage.getItem("cantidadRodados") == null) {
      sessionStorage.setItem("cantidadRodados", []);
      cantidadRodadosOldData = [];
    } else {
      cantidadRodadosOldData = JSON.parse(
        sessionStorage.getItem("cantidadRodados"),
      );
    }
    cantidadRodadosOldData.push(cantidadRodados);
    sessionStorage.setItem(
      "cantidadRodados",
      JSON.stringify(cantidadRodadosOldData),
    );

    //horas
    let cantidadHorasOldData;
    if (sessionStorage.getItem("cantidadHoras") == null) {
      sessionStorage.setItem("cantidadHoras", []);
      cantidadHorasOldData = [];
    } else {
      cantidadHorasOldData = JSON.parse(
        sessionStorage.getItem("cantidadHoras"),
      );
    }
    cantidadHorasOldData.push(cantidadHoras);
    sessionStorage.setItem(
      "cantidadHoras",
      JSON.stringify(cantidadHorasOldData),
    );
  });
});
