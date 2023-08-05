const fs = require("fs");
const { v4: uuidv4 } = require("uuid");


const User = {
    filename: "src/database/usuarios.json",

    //Traigo todos los usuarios
    traerUsuarios: function(){
        return JSON.parse(fs.readFileSync(this.filename, 'utf-8'));
    },

    //Encuentro usuario por PK y Campo
    encontrarUsuarioPorPK: function(id){
        let todosLosUsuarios = this.traerUsuarios();
        let usuarioPK = todosLosUsuarios.find(user => user.id === id);
        return usuarioPK;
    },
    encontrarUsuarioPorCampo: function(campo, campoFormulario){
        let todosLosUsuarios = this.traerUsuarios();
        let usuarioCampo = todosLosUsuarios.find(user => user[campo] === campoFormulario);
        return usuarioCampo;
    },

    //Creo usuario en la bd
    crearUsuarioEnBD: function(datosUsuario){
        let todosLosUsuarios = this.traerUsuarios();
        let usuarioNuevo = {
            id: uuidv4(), //uso de uuid para generar un id unico
            ...datosUsuario
        }
        todosLosUsuarios.push(usuarioNuevo);
        fs.writeFileSync(this.filename, JSON.stringify(todosLosUsuarios, null, ''));
        return usuarioNuevo;
    },

    // Borro usuario de la bd
    borrarUsuarioDeBD: function(id){
        let todosLosUsuarios = this.traerUsuarios();
        let usuariosNoBorrados = todosLosUsuarios.filter((user)=> {
            user.id !== id
        })
        fs.writeFileSync(this.filename, JSON.stringify(usuariosNoBorrados, null, ''))
    }
}

module.exports = User;