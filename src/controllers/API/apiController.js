const db = require("../../database/models");

const apiController = {
  getUsers: async (req, res) => {
    db.usuario.findAll().then((usuarios) => {
      res.json({
        count: usuarios.length,
        users: usuarios.map((user) => {
          let usuarioSinPassword = { ...user.dataValues };
          delete usuarioSinPassword.clave;
          return usuarioSinPassword;
        }),
      });
    });
  },
  getUserById: async (req, res) => {
    db.usuario
      .findByPk(req.params.id)
      .then((usuario) => {
        let usuarioSinPassword = { ...usuario.dataValues };
        delete usuarioSinPassword.clave;
        res.json(usuarioSinPassword);
      })
      .catch((err) => {
        console.error(err);
        res.json("USUARIO NO ENCONTRADO");
      });

    // try {
    //   let usuario = await db.usuario.findByPk(req.params.id);
    //   let usuarioSinPassword = { ...usuario.dataValues };
    //   delete usuarioSinPassword.clave;
    //   res.json(usuarioSinPassword);
    // } catch (error) {
    //   console.error(err);
    //   res.json("USUARIO NO ENCONTRADO");
    // }
  },
  getProducts: async (req, res) => {
    try {
      let rodados = await db.rodado.findAll();
      let countByCategory = await db.rodado.findAll({
        attributes: ["categ", [db.sequelize.fn("count", "categ"), "cant"]],
        group: ["categ"],
      });
      let count = rodados.length;
      let products = rodados.map((rodado) => {
        let totalRodados = { ...rodado.dataValues };
        return totalRodados;
      });

      res.json({
        count,
        countByCategory,
        products,
      });
    } catch (err) {
      console.error(err);
      res.json("ALGO SALIO MAL");
    }
  },

  getProductById: (req, res) => {
    db.rodado
      .findByPk(req.params.id, {
        include: [
          { association: "modelo" },
          { association: "color" },
          { association: "usuario" },
        ],
      })
      .then((rodados) => {
        res.json(rodados);
      })
      .catch((err) => {
        console.error(err);
        res.json("RODADO NO ENCONTRADO");
      });
  },
  getCategories: (req, res) => {
    
    db.rodado.findAll({
      group: ['modelo_id']
    }).then(function(rod){ 
      res.json(rod)
    })
      
  },
};

module.exports = { apiController };
