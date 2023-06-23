const path = require('path');

const controlador = {

    login: function(req,res){
        res.render("login");
    },

    register: function(req,res){
        res.render("registro");
    }
}

module.exports = controlador;