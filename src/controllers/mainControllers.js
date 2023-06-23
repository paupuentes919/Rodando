const path = require('path');

const controlador = {

    home: function(req,res){
        res.render("home");
    }
}

module.exports = controlador;