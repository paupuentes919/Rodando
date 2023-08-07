const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const User = {
  fileName: "src/database/usuarios.json",

  //Traigo todos los usuarios
  traerUsuarios: function () {
    return JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
  },

  //Encuentro usuario por PK y Campo
  encontrarUsuarioPorPK: function (id) {
    let todosLosUsuarios = this.traerUsuarios();
    let usuarioPK = todosLosUsuarios.find((user) => user.id == id);
    return usuarioPK;
  },
  encontrarUsuarioPorCampo: function (campo, campoFormulario) {
    let todosLosUsuarios = this.traerUsuarios();
    let usuarioCampo = todosLosUsuarios.find(
      (user) => user[campo] === campoFormulario,
    );
    return usuarioCampo;
  },

  //Creo usuario en la bd
  crearUsuarioEnBD: function (datosUsuario) {
    let todosLosUsuarios = this.traerUsuarios();
    let usuarioNuevo = {
      id: uuidv4(), //uso de uuid para generar un id unico
      ...datosUsuario,
    };
    todosLosUsuarios.push(usuarioNuevo);
    fs.writeFileSync(
      this.fileName,
      JSON.stringify(todosLosUsuarios, null, " "),
    );
    return usuarioNuevo;
  },

  // Borro usuario de la bd// ESTE NO FUNCIONA!!! SOLUCIONARLO
  borrarUsuarioDeBD: function (id) {
    let todosLosUsuarios = this.traerUsuarios();
    let usuariosNoBorrados = todosLosUsuarios.filter((user) => {
      user.id !== id;
    });
    fs.writeFileSync(
      this.fileName,
      JSON.stringify(usuariosNoBorrados, null, " "),
    );
    return usuariosNoBorrados;
  },
};
// console.log(User.borrarUsuarioDeBD(1));

module.exports = User;
