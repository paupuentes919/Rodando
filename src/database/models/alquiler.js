function alquilerData(sequelize, Datatypes) {
  let alias = "alquiler";

  let cols = {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codigo_reserva: { type: Datatypes.STRING(50) },
    fecha_emision_alquiler: { type: Datatypes.DATE },
    nombre: { type: Datatypes.STRING(200) },
    apellido: { type: Datatypes.STRING(200) },
    telefono: { type: Datatypes.STRING(200) },
    email: { type: Datatypes.STRING(200) },
    precio_total: { type: Datatypes.DECIMAL },
    estado: { type: Datatypes.ENUM("activo", "devuelto") },
  };

  let config = {
    tableName: "alquiler",
    timestamps: false,
  };

  const alquiler = sequelize.define(alias, cols, config);

  alquiler.associate = function (models) {
    alquiler.belongsToMany(models.rodado, {
      as: "rodados",
      through: "rodado_alquiler",
      foreignKey: "alquiler_id",
      otherKey: "rodado_id",
      timestamps: false,
    });
  };

  return alquiler;
}

module.exports = alquilerData;
