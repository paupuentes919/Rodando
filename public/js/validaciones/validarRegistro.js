let campos = {
  nombre: false,
  apellido: false,
  email: false,
  password: false,
  telefono: false,
  direccion: false,
};

//validacion campo nombre
const inputNombre = document.querySelector("#input-name");

inputNombre.addEventListener("blur", function () {
  let regex = /^[a-zA-Z]+( [a-zA-Z]+)?$/;
  let errorNombre = document.querySelector("#errorNombre");
  if (inputNombre.value.length < 3) {
    errorNombre.innerHTML =
      "<p>El campo Nombre debe tener al menos 3 letras<p>";
    errorNombre.style.display = "inline";
    campos.nombre = false;
  } else if (!regex.test(inputNombre.value)) {
    errorNombre.innerHTML = "<p>Debe contener sólo letras<p>";
    errorNombre.style.display = "inline";
    campos.nombre = false;
  } else {
    errorNombre.style.display = "none";
    campos.nombre = true;
  }
});

//validacion campo Apellido

const inputApellido = document.querySelector("#input-apellido");

inputApellido.addEventListener("blur", function () {
  let regex = /^[a-zA-Z]+( [a-zA-Z]+)?$/;
  let errorApellido = document.querySelector("#errorApellido");
  if (inputApellido.value.length < 3) {
    errorApellido.innerHTML =
      "<p>El campo Apellido debe tener al menos 3 letras<p>";
    errorApellido.style.display = "inline";
    campos.apellido = false;
  } else if (!regex.test(inputApellido.value)) {
    errorApellido.innerHTML = "<p>Debe contener sólo letras<p>";
    errorApellido.style.display = "inline";
    campos.apellido = false;
  } else {
    errorApellido.style.display = "none";
    campos.apellido = true;
  }
});

// validacion campo Email
const inputEmail = document.querySelector("#input-email");
inputEmail.addEventListener("blur", function () {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!regex.test(inputEmail.value)) {
    let errorEmail = document.querySelector("#errorEmail");
    errorEmail.innerHTML = "<p>Email inválido<p>";
    errorEmail.style.display = "inline";
    campos.email = false;
  } else {
    errorEmail.style.display = "none";
    campos.email = true;
  }
});

//validar campo password

const inputPassword = document.querySelector("#input-password");

inputPassword.addEventListener("blur", function () {
  const regex = /^(?=.*[A-Z])[a-zA-Z0-9]+$/;
  let errorPassword = document.querySelector("#errorPassword");
  if (inputPassword.value.length < 8) {
    errorPassword.innerHTML = "<p>Debe tener al menos 8 caracteres<p>";
    errorPassword.style.display = "inline";
    campos.password = false;
  } else if (!regex.test(inputPassword.value)) {
    errorPassword.innerHTML = "<p>Debe tener al menos 1 mayúscula<p>";
    errorPassword.style.display = "inline";
    campos.password = false;
  } else {
    errorPassword.style.display = "none";
    campos.password = true;
  }
});

//validar teléfono

const inputTelefono = document.querySelector("#input-telefono");

inputTelefono.addEventListener("blur", function () {
  const regex = /^[0-9]+$/;
  let errorTelefono = document.querySelector("#errorTelefono");
  if (!regex.test(inputTelefono.value)) {
    errorTelefono.innerHTML = "<p>Solo números, sin guiones ni espacios<p>";
    errorTelefono.style.display = "inline";
    campos.telefono = false;
  } else if (inputTelefono.value.length < 7) {
    errorTelefono.innerHTML = "<p>Ingrese teléfono válido<p>";
    errorTelefono.style.display = "inline";
    campos.telefono = false;
  } else {
    errorTelefono.style.display = "none";
    campos.telefono = true;
  }
});

// validar direccion

const inputDireccion = document.querySelector("#input-direccion");

inputDireccion.addEventListener("blur", function () {
  if (inputDireccion.value === "" || inputDireccion.value.length < 5) {
    let errorDireccion = document.querySelector("#errorDireccion");
    errorDireccion.innerHTML = "<p>Completar dirección <p>";
    errorDireccion.style.display = "inline";
    campos.direccion = false;
  } else {
    errorDireccion.style.display = "none";
    campos.direccion = true;
  }
});

let formulario = document.querySelector("#formRegistro");

formulario.addEventListener("submit", function (e) {
  
  if (
    campos.nombre &&
    campos.apellido &&
    campos.email &&
    campos.password &&
    campos.telefono &&
    campos.direccion
) {
    
   // errorEnviar.style.display = "none";
   let botonEnviar = document.querySelector("#boton-enviar");

    formulario.style.display = "none";
    botonEnviar.style.display = "none!important";

    let confirm = document.querySelector("#confirmacion");
    confirm.style.display = "block"
    confirm.innerHTML = "<h3>¡Formulario enviado!</h3>";

    formulario.submit()

  } else {

    e.preventDefault();
    let errorEnviar = document.querySelector("#errorEnviar");

    errorEnviar.innerHTML = "<p><b>Debe completar el formulario</b><p>";
    errorEnviar.style.display = "inline";
  }
});
