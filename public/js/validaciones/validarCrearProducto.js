console.log(Window)
// let formulario = document.getElementById("formulario");
const boton = document.getElementById("sendButton");
const inputs = document.querySelectorAll(
  "#formulario input, #formulario textarea",
);

const expReg = {
  titulo: /^[0-9a-záéíóúüñA-ZÁÉÍÓÚÜÑ ]{5,26}$/, // Letras, numeros, guion y guion_bajo
  rodado: /^[0-9]{2}$/, // Numeros de 2 digitos.
  descripcion: /^.{10,1000}$/, //Maximo 1000 caracteres
};

let campos = {
  title: false,
  rodado: false,
  imagen: false,
  desc: false,
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "title":
      validarCampos(expReg.titulo, e.target, e.target.id);
      break;
    case "rodado":
      validarCampos(expReg.rodado, e.target, e.target.id);
      break;
    case "imagen":
      validarCampoImagen(e.target.files, e.target.id);

      break;
    case "desc":
      validarCampos(expReg.descripcion, e.target, e.target.id);

      break;

    default:
      break;
  }
};

//validar campo de imagen

const validarCampoImagen = (imagen, idInput) => {
  if (imagen.length > 0) {
    document.getElementById(`${idInput}`).classList.remove("error");
    document.getElementById(`${idInput}`).classList.add("correcto");

    document
      .querySelector(`#leyendaError-${idInput}`)
      .classList.remove("leyenda-error-activo");
    campos[idInput] = true;
  } else {
    document.getElementById(`${idInput}`).classList.add("error");
    document.getElementById(`${idInput}`).classList.remove("correcto");
    document
      .querySelector(`#leyendaError-${idInput}`)
      .classList.add("leyenda-error-activo");
    campos[idInput] = false;
  }
};

//funcion para validar

const validarCampos = (expRegular, target, idInput) => {
  if (expRegular.test(target.value)) {
    document.getElementById(`${idInput}`).classList.remove("error");
    document.getElementById(`${idInput}`).classList.add("correcto");
    document
      .querySelector(`#circleCheck-${idInput}`)
      .classList.add("fa-check-circle", "check-cruz-correcto");
    document
      .querySelector(`#circleCheck-${idInput}`)
      .classList.remove("fa-times-circle", "check-cruz-incorrecto");
    document
      .querySelector(`#leyendaError-${idInput}`)
      .classList.remove("leyenda-error-activo");
    campos[idInput] = true;
  } else {
    document.getElementById(`${idInput}`).classList.add("error");
    document.getElementById(`${idInput}`).classList.remove("correcto");
    document
      .querySelector(`#circleCheck-${idInput}`)
      .classList.add("fa-times-circle", "check-cruz-incorrecto");
    document
      .querySelector(`#circleCheck-${idInput}`)
      .classList.remove("fa-check-circle", "check-cruz-correcto");
    document
      .querySelector(`#leyendaError-${idInput}`)
      .classList.add("leyenda-error-activo");
    campos[idInput] = false;
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

//Submit de formulario
let formulario = document
  .getElementById("formulario")
  .addEventListener("submit", (e) => {
    if (campos.title && campos.rodado && campos.imagen && campos.desc) {
      formulario.reset();

      document
        .getElementById("msj-correcto")
        .classList.add("enviar-msj-mostrar");
      setTimeout(() => {
        document
          .getElementById("msj-correcto")
          .classList.remove("enviar-msj-mostrar");
      }, 4000);

      document.querySelectorAll(".check-cruz-correcto").forEach((check) => {
        check.classList.remove("check-cruz-correcto");
      });
      document.querySelectorAll(".correcto").forEach((check) => {
        check.classList.remove("correcto");
      });

      /*Volver todo a false. Porque sino, se puede presionar "Enviar" nuevamente
     y se enviara los campos vacios (valido solo para el envío sin actualizar)*/

      Object.keys(campos).forEach(function (key) {
        campos[key] = !campos[key];
      });
    } else {
      e.preventDefault();
      document
        .getElementById("msj-incorrecto")
        .classList.add("enviar-msj-mostrar");
      setTimeout(() => {
        document
          .getElementById("msj-incorrecto")
          .classList.remove("enviar-msj-mostrar");
      }, 2000);
    }
  });
