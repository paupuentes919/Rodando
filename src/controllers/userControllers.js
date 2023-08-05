const path = require('path');
const bcryptjs = require('bcryptjs');
const User = require('../models/User');

const controlador = {

    register: function(req,res){
        res.render("registro");
    },
    processRegister: function(req,res){
        let usuarioEnBD = User.encontrarUsuarioPorCampo('mail', req.body.mail);
        let usuarioACrear = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            mail: req.body.mail,
            contraseña: bcryptjs.hashSync(req.body.contraseña, 10),
            telefono: req.body.telefono,
            direccion: req.body.direccion,
            avatar: "req.file.filename ARREGLARLO"
        }

        if(usuarioEnBD){
            res.send("Usuario ya registrado!")
        } else {
            User.crearUsuarioEnBD(usuarioACrear);
            res.redirect("/login");
        }
    },

    login: function(req,res){
        res.render("login");
    }

}

module.exports = controlador;