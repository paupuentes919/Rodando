function colorData(sequelize, Datatypes) {
  alias = "color";
  cols = {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    color: { type: Datatypes.STRING(50) },
  };
  config = { timestamps: false };
  const color = sequelize.define(alias, cols, config);
  return color;
}

module.exports = colorData;
