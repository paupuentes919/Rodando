function alquilerData(sequelize, Datatypes) {
  alias = "alquiler";
  cols = {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_persona: { type: Datatypes.STRING(200) },
    telefono: { type: Datatypes.STRING(200) },
    fecha_inicio: { type: Datatypes.DATE },
    fecha_fin: { type: Datatypes.DATE },
    monto_hora: { type: Datatypes.DECIMAL },
    pagado: { type: Datatypes.BIT },
    monto_seguro: { type: Datatypes.DECIMAL },
    seguro_devuelto: { type: Datatypes.BIT },
  };
  config = { timestamps: false };
  const alquiler = sequelize.define(alias, cols, config);
  return alquiler;
}

alquiler.belongsToMany(rodado, {
  as: "rodado",
  through: "rodado_alquiler",
  foreignKey: "alquiler_id",
  otherKey: "rodado_id",
  timestamps: false,
});

module.exports = alquilerData;
