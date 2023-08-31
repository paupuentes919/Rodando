function sucursalData(sequelize, Datatypes) {
  alias = "sucursal";
  cols = {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numero_sucursal: { type: Datatypes.INTEGER },
    direccion: { type: Datatypes.STRING(200) },
    telefono: { type: Datatypes.STRING(20) },
    fecha_creacion: { type: Datatypes.DATE },
    fecha_eliminacion: { type: Datatypes.DATE },
    ciudad_id: { type: Datatypes.INTEGER },
  };
  config = { timestamps: false };
  const sucursal = sequelize.define(alias, cols, config);
  return sucursal;
}

sucursal.belongsTo(ciudad, {
  as: "ciudad",
  foreignKey: "ciudad_id",
});

sucursal.hasMany(usuario, {
  as: "usuario",
  foreignKey: "sucursal_id",
});

module.exports = sucursalData;
