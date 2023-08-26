function ciudadData(sequelize, Datatypes) {
  alias = "ciudad";
  cols = {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: { type: Datatypes.STRING(200) },
  };
  config = { timestamps: false };
  const ciudad = sequelize.define(alias, cols, config);
  return ciudad;
}

module.exports = ciudadData;
