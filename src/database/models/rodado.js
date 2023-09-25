function rodadoData(sequelize, Datatypes) {
  
    let alias = "rodado";
    
    let cols = {
      id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: { type: Datatypes.STRING(200) },
      precio_hora: { type: Datatypes.DECIMAL },
      descripcion: { type: Datatypes.TEXT },
      rodado: { type: Datatypes.INTEGER },
      fecha_creacion: { type: Datatypes.DATE },
      fecha_eliminacion: { type: Datatypes.DATE },
      imagen: { type: Datatypes.STRING(50) },
      categ: { type: Datatypes.ENUM("bicicleta", "monopatin") },
      usuario_id: { type: Datatypes.INTEGER },
      modelo_id: { type: Datatypes.INTEGER },
      color_id: { type: Datatypes.INTEGER },
    };
    
    let config = { 
        tableName: 'rodado',
        timestamps: false,    
      };
    
    const rodado = sequelize.define(alias, cols, config);
    
    rodado.associate = function(models){
      rodado.belongsTo(models.modelo, {
        as: "modelo",
        foreignKey: "modelo_id",
      });
  
      rodado.belongsTo(models.color, {
        as: "color",
        foreignKey: "color_id",
      });
  
      rodado.belongsToMany(models.alquiler, {
        as: "alquiler",
        through: "rodado_alquiler",
        foreignKey: "rodado_id",
        otherKey: "alquiler_id",
        timestamps: false,
      });
    }
   
   return rodado;
  
  }
  module.exports = rodadoData;