const path = require('path');

const pcontrolador = {

    carrito: function(req,res){
        res.render("carrito");
    },

    detalle: function(req,res){
        res.render("detalle");
    }
}

module.exports = pcontrolador;