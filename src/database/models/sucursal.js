function sucursalData(sequelize, Datatypes) {
  
    let alias = "sucursal";
    
    let cols = {
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
    
    let config = { 
        tableName: 'sucursal',
        timestamps: false,    
      };
    
    const sucursal = sequelize.define(alias, cols, config);
    
    
    sucursal.associate = function(models){
      sucursal.belongsTo(models.ciudad, {
        as: "ciudad",
        foreignKey: "ciudad_id",
      });
  
      sucursal.hasMany(models.usuario, {
        as: "usuario",
        foreignKey: "sucursal_id",
      });
    }  
  
    return sucursal;
  
  }
  module.exports = sucursalData;
  