function categoriaData(sequelize, Datatypes) {
  alias = "categoria";
  cols = {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: { type: Datatypes.STRING(200) },

    tipo_vehiculo: { type: Datatypes.ENUM("bicicletas", "monopatines") },
  };
  config = { timestamps: false };
  const categoria = sequelize.define(alias, cols, config);
  return categoria;
}

categoria.hasMany(rodado, {
  as: "rodado",
  foreignKey: "categoria_id",
});

module.exports = categoriaData;
