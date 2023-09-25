function modeloData(sequelize, Datatypes) {
  
  let alias = "modelo";
  
  let cols = {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: { 
      type: Datatypes.STRING(200) 
    }
  };
  
  let config = { 
    tableName: 'modelo',
    timestamps: false,    
  };

  const modelo = sequelize.define(alias, cols, config);
  
  modelo.associate = function(models){
    modelo.hasMany(models.rodado, {
      as: "rodado",
      foreignKey: "modelo_id",
    })
  }

  return modelo;
}

module.exports = modeloData;
