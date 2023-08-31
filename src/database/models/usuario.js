function usuarioData(sequelize, Datatypes) {
  alias = "usuario";
  cols = {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: { type: Datatypes.STRING(200) },
    telefono: { type: Datatypes.STRING(20) },
    direccion: { type: Datatypes.STRING(200) },
    email: { type: Datatypes.STRING(100) },
    clave: { type: Datatypes.STRING(50) },
    rol: { type: Datatypes.ENUM("superadmin", "admin") },
    fecha_creacion: { type: Datatypes.DATE },
    fecha_eliminacion: { type: Datatypes.DATE },
    sucursal_id: { type: Datatypes.INTEGER },
  };
  config = { timestamps: false };
  const usuario = sequelize.define(alias, cols, config);
  return usuario;
}

usuario.belongsTo(sucursal, {
  as: "sucursal",
  foreignKey: "sucursal_id",
});

usuario.hasMany(rodado, {
  as: "rodado",
  foreignKey: "usuario_id",
});

module.exports = usuarioData;
