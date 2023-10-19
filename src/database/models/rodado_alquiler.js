function rodado_alquilerData(sequelize, Datatypes) {
    
    let alias = "rodado_alquiler";
    
    let cols = {
      id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      rodado_id: {
        type: Datatypes.INTEGER
      },
      alquiler_id: {
        type: Datatypes.INTEGER
      },
      cant_horas: {
        type: Datatypes.INTEGER
      }
    };

    let config = { 
        tableName: 'rodado_alquiler',
        timestamps: false,    
      };
    
    const rodado_alquiler = sequelize.define(alias, cols, config);
    
    return rodado_alquiler;
  }

  module.exports = rodado_alquilerData;