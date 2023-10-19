const db = require("../database/models");

const alquilerController = {
  mostrarAlquileres: async (req, res) => {
    db.alquiler
      .findAll()
      .then((resultadoAlquileres) => {
        res.json(resultadoAlquileres);
      })
      .catch((err) => {
        console.error(err);
        res.json("NO HAY RESULTADOS");
      });
  },

  mostrarAlquilerById: async (req, res) => {
    db.alquiler
      .findByPk(req.params.id)
      .then((alquilerEncontrado) => {
        res.json(alquilerEncontrado);
      })
      .catch((err) => {
        console.error(err);
        res.json("ALQUILER NO ENCONTRADO");
      });
  },

  postAlquiler: async (req, res) => {},
};

module.exports = { alquilerController };
