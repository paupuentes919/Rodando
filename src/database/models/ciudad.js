function ciudadData(sequelize, Datatypes) {
  
  let alias = "ciudad";
  
  let cols = {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: { 
      type: Datatypes.STRING(200) 
    },
  };
  
  let config = { 
    tableName: 'ciudad',
    timestamps: false,    
  };
  
  const ciudad = sequelize.define(alias, cols, config);
  
  ciudad.associate = function(models){
    ciudad.hasMany(models.sucursal, {
      as: "sucursal",
      foreignKey: "ciudad_id",
    })
  } 
  
  return ciudad;

}

module.exports = ciudadData;
