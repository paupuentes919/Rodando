let alquiler_id = document.querySelector('#alquiler_id');
let rodadoID = document.querySelector('#rodado_id');
let cant = document.querySelector('#cantidad_rodados');


fetch(`http://localhost:3010/alquiler`)
    .then(function(res){
        return res.json()
    })
    .then(function(data){
        lista_rodado_alquiler = data.rod_alq
        lista_alquileres = data.alquileres
        cant.innerHTML += lista_detalle[rodadoID.innerHTML].cantidad_rodados
    })

let container = document.querySelector('#containerId');
let display1 = document.querySelector('#adicionales');

container.addEventListener('click', function(){
    display1.classList.toggle("display")
})