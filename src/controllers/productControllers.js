const path = require("path");

const pcontrolador = {
    carrito: function (req, res) {
        res.render("carrito");
    },

    detalle: function (req, res) {
        res.render("detalle");
    },
    crear: function (req, res) {
        res.render("crearProducto");
    },
    editar: function (req, res) {
        res.render("editarProducto");
    },
};

module.exports = pcontrolador;
