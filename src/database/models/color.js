function colorData(sequelize, Datatypes) {
  
  let alias = "color";
  
  let  cols = {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: { 
      type: Datatypes.STRING(50),
      NULL: false 
    }    
  };
  
  let config = { 
    tableName: 'color',
    timestamps: false,    
  };
  
  const color = sequelize.define(alias, cols, config);
  
  color.associate = function(models){
    color.hasMany(models.rodado, {
      as: "rodado",
      foreignKey: "color_id",
    });
  }

  return color;
}


module.exports = colorData;
