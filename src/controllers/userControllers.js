const path = require('path');

const controlador = {

    login: function(req,res){
        res.sendFile(path.join(__dirname, "../views/login.html"))
    },

    register: function(req,res){
        res.sendFile(path.join(__dirname, "../views/registro.html"))
    }
}

module.exports = controlador;