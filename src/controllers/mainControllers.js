const path = require('path');

const controlador = {

    home: function(req,res){
        res.sendFile(path.join(__dirname, "../views/home.html"))
    }
}

module.exports = controlador;