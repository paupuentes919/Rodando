function alquilerData(sequelize, Datatypes) {
    
    let alias = "alquiler";
    
    let cols = {
      id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre_persona: { type: Datatypes.STRING(200) },
      telefono: { type: Datatypes.STRING(200) },
      fecha_inicio: { type: Datatypes.DATE },
      fecha_fin: { type: Datatypes.DATE },
      monto_hora: { type: Datatypes.DECIMAL },
      pagado: { type: Datatypes.BOOLEAN },
      monto_seguro: { type: Datatypes.DECIMAL },
      seguro_devuelto: { type: Datatypes.BOOLEAN },
    };
    
    let config = { 
        tableName: 'alquiler',
        timestamps: false,    
      };
    
    const alquiler = sequelize.define(alias, cols, config);
    
  
    alquiler.associate = function(models){
      alquiler.belongsToMany(models.rodado, {
        as: "rodados",
        through: "rodado_alquiler",
        foreignKey: "alquiler_id",
        otherKey: "rodado_id",
        timestamps: false,
      });
    }
  
    return alquiler;
  
  }
  
  module.exports = alquilerData;