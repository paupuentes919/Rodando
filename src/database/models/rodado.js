function rodadoData(sequelize, Datatypes) {
  alias = "rodado";
  cols = {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: { type: Datatypes.STRING(200) },
    precio_hora: { type: Datatypes.DECIMAL },
    descripcion: { type: Datatypes.TEXT },
    rodado: { type: Datatypes.INTEGER },
    fecha_creacion: { type: Datatypes.DATE },
    fecha_eliminacion: { type: Datatypes.DATE },
    imagen: { type: Datatypes.STRING(50) },
    usuario_id: { type: Datatypes.INTEGER },
    categoria_id: { type: Datatypes.INTEGER },
    color_id: { type: Datatypes.INTEGER },
  };
  config = { timestamps: false };
  const rodado = sequelize.define(alias, cols, config);
  return rodado;
}
rodado.belongsTo(categoria, {
  as: "categoria",
  foreignKey: "categoria_id",
});

rodado.belongsTo(usuario, {
  as: "usuario",
  foreignKey: "usuario_id",
});

rodado.belongsTo(color, {
  as: "color",
  foreignKey: "color_id",
});

rodado.belongsToMany(alquiler, {
  as: "alquiler",
  through: "rodado_alquiler",
  foreignKey: "rodado_id",
  otherKey: "alquiler_id",
  timestamps: false,
});

module.exports = rodadoData;
