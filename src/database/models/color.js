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

color.hasMany(rodado, {
  as: "rodado",
  foreignKey: "color_id",
});

module.exports = colorData;
