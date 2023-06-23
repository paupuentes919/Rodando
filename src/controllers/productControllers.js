const path = require('path');

const pcontrolador = {

    carrito: function(req,res){
        res.sendFile(path.join(__dirname, "../views/carrito.html"))
    },

    detalle: function(req,res){
        res.sendFile(path.join(__dirname, "../views/detalle.html"))
    }
}

module.exports = pcontrolador;