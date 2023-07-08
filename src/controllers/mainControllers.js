const fs = require("fs");
const path = require("path");
const bicicletasPath = path.join(__dirname, "../database/bicicletas.json");
const monopatinesPath = path.join(__dirname, "../database/monopatines.json");

const controlador = {
  home: function (req, res) {
    res.render("home");
  },
  bicicletas: function (req, res) {
    /* leo un json y lo parseo */
    const bicicletas = JSON.parse(fs.readFileSync(bicicletasPath, "utf-8"));
    res.render("bicicletas", {bicicletas});
  },
  monopatines: function (req, res) {
    /* leo un json y lo parseo */
    const monopatines = JSON.parse(fs.readFileSync(monopatinesPath, "utf-8"));
    res.render("monopatines", {monopatines});
  },
};

module.exports = controlador;
