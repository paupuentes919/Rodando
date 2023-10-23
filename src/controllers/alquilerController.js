const { uuid } = require("uuidv4");
const db = require("../database/models");

const alquilerController = {
/*  
  mostrarAlquileres: async (req, res) => {
    db.alquiler
      .findAll({
        include: [{ association: "rodados" }],
        where: {
          estado: 'activo'  
        }
      })
      .then((alquileres) => {
        console.log(alquileres[0])
        res.render( "alquileres" , {alquileres} );
      })
      .catch((error) => {
        res.json({ message: "Ocurrio un error", error });
      });
  },
 */
  
  mostrarAlquileres: function (req, res) {
      Promise.all([db.rodado_alquiler.findAll(), db.alquiler.findAll({
          include: [{ association: "rodados" }],
            where: {
              estado: 'activo'  
            }
          })
      ])
      .then(function ([ rod_alq , alquileres  ]) {
        res.render( "alquileres" , { rod_alq, alquileres} );
      })
      .catch((error) => {
        res.json({ message: "Ocurrio un error", error });
      });
  },
  

  mostrarAlquilerById: async (req, res) => {
    try {
      const alquilerById = await db.alquiler.findByPk(req.params.id);
      if (!alquilerById) return res.sendStatus(404);

      const detallesAlquiler = await db.rodado_alquiler.findAll({
        where: { alquiler_id: req.params.id },
      });

      return res.json({ alquilerById, detallesAlquiler });
    } catch (error) {
      res.json({ message: "Ocurrio un error", error });
    }
  },

  postAlquiler: async (req, res) => {
    const { nombre, apellido, telefono, email, precio_total, carrito } = req.body;
    try {
      const alquiler = await db.alquiler.create({
        codigo_reserva: "CODhdjdi",
        fecha_emision_alquiler: new Date(),
        nombre,
        apellido,
        telefono,
        email,
        precio_total,
        estado: 'activo',
      });

      carrito.forEach(async (rodado) => {
        await db.rodado_alquiler.create({
          rodado_id: rodado.id,
          alquiler_id: alquiler.id,
          cantidad_rodados: rodado.cantidadRodado,
          cantidad_horas: rodado.cantidadHoras,
          precio_hora: rodado.precioUnitario,
        });
      });
      res.status(201).json({ carrito, alquiler });
    } catch (error) {
      res.json({ message: "Ocurrio un error", error });
    }
  },

  editAlquiler: async (req, res) => {
    try {
      const alquilerById = await db.alquiler.findByPk(req.params.id);
      if (!alquilerById) return res.sendStatus(404);

      await db.alquiler.update(req.body, {
        where: { id: req.params.id },
      });

      res.json({
        message: `Alquiler ${req.params.id} editado exitosamente`,
      });
    } catch (error) {
      res.json({ message: "Ocurrio un error", error });
    }
  },

  deleteAlquiler: async (req, res) => {
    try {
      let alquiler = await db.alquiler.findOne({
        where: { id: req.params.id },
      });
      if (!alquiler) {
        return res.sendStatus(404);
      }
      await db.rodado_alquiler.destroy({
        where: { alquiler_id: req.params.id },
      });
      await db.alquiler.destroy({ where: { id: req.params.id } });
      res.json({ message: "Recurso borrado exitosamente" });
    } catch (error) {
      res.json({ message: "Ocurrio un error", error });
    }
  },
};

module.exports = { alquilerController };
