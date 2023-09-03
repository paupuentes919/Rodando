function categoriaData(sequelize, Datatypes) {
  
  let alias = "categoria";
  
  let cols = {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: { 
      type: Datatypes.STRING(200) 
    },
    tipo_vehiculo: { 
      type: Datatypes.ENUM("bicicletas", "monopatines") 
    }
  };
  
  let config = { 
    tableName: 'categoria',
    timestamps: false,    
  };

  const categoria = sequelize.define(alias, cols, config);
  
  categoria.associate = function(models){
    categoria.hasMany(models.rodado, {
      as: "rodado",
      foreignKey: "categoria_id",
    })
  }

  return categoria;
}

module.exports = categoriaData;
