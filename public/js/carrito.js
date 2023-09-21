window.addEventListener("load", function () {
  //DETALLE
  // Captura de los inputs y botones
  let tituloRodado = document.querySelector("#titulo-rodado").innerText;
  let precioUnitario = document.querySelector("#precio-unitario");
  let btnCarrito = document.querySelector("#btn-carrito");
  let cantidadRodados = document.querySelector("#cantidad-rodados");
  let cantidadHoras = document.querySelector("#cantidad-horas");
  let datepicker = document.querySelector("#datepicker");

  let tituloRodadoCarrito = document.querySelector("#titulo-rodado-carrito");

  let array = [];

 // Guardar en SessionStorage cuando se hace click en el btn del carrito
  btnCarrito.addEventListener("click", function () {
    for(let i=0; i<tituloRodado.length;i++){
        array.push(sessionStorage.setItem("tituloRodado", JSON.stringify(tituloRodado)));
    }
    
    sessionStorage.setItem("precioUnitario", precioUnitario.innerText);
    sessionStorage.setItem("cantidadRodados", cantidadRodados.value);
    sessionStorage.setItem("cantidadHoras", cantidadHoras.value);
    sessionStorage.setItem("datepicker", datepicker.value);
    
    // tituloRodadoCarrito = JSON.parse(sessionStorage.getItem("tituloRodado"));
  });

//   console.log("ver",tituloRodado);
  
 //CARRITO
 // Captura de los inputs y botones
 
 
//  tituloRodadoCarrito.innerText = tituloRodado.innerText;
 
 
});
