var moment = require('moment');
const fs = require("fs");
const path = require("path");
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const db = require ('../database/models');


cloudinary.config({
	cloud_name: 'dkguig17n',
	api_key: '224877749259764',
	api_secret: 'ul1tsDPqbMh9URQF2Ex5DRXcfOA',
});

const pcontrolador = {
  
  bicicletas: function(req, res){

    
  /* busco todas las bicicletas en la base de datos */
    db.rodado.findAll({
      group: ['modelo_id'],
      where:{
        categ: 'bicicleta'
      }
    }).then(function(bici){
      res.render("bicicletas", { bici });
    })
    },
  
  monopatines: function (req, res) {
  /* busco todos los monopatines en la base de datos */
    db.rodado.findAll({
      group: ['modelo_id'],
      where:{
        categ: 'monopatin'
      }
    }).then(function(mono){
      res.render("monopatines", { mono });
    })
  },

  detalle: function (req, res) {
  /* busco un producto en funcion de su ID */
    db.rodado.findByPk(req.params.id , {
      include: [{association: 'modelo'}, {association: 'color'}]
    })
        .then(function(product){
          if (product) {
          res.render("detalle", { product });
          }
          else { res.redirect('/') }
        })     
  },
    
  crearVista: function (req, res) {
    Promise.all([ db.color.findAll(),db.usuario.findAll()])
    .then(function ([ color, usuario]) {
      // Pasa ambas consultas a la vista
      res.render("crearProducto", {  color, usuario });
    }) 
  },

  crearItemEnBD: async function (req, res) { 

//---------------------------Carga en Cloudinary----------------------------------------// 
  
    const imageBuffer = req.file.buffer;
    const customFilename = `user-${Date.now()}${path.extname(req.file.originalname)}`;

    const uploadPromise = new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream({ resource_type: 'image', public_id: customFilename}, (error, result) => {
        if (error) {
          console.error('Error during upload:', error);
          reject(error);
        } else {
          console.log('Upload successful:', result);
          resolve(result);
        }
      });

    streamifier.createReadStream(imageBuffer).pipe(stream);
    });

    const uploadedImage = await uploadPromise;

    db.modelo.findAll({
    }).then(function(modelo){
      let newId = modelo[(modelo.length - 1)].id + 1
      
      db.modelo.create({
        id: newId,
        nombre: req.body.title,
      })
    
      db.rodado.create({
        nombre: req.body.title,
        precio_hora: req.body.price,
        descripcion: req.body.desc,
        rodado: req.body.rodado,
        fecha_creacion: moment().format(),
        fecha_eliminacion: '',
        imagen: customFilename,
        categ: req.body.vehiculo,
        usuario_id: req.body.usuario ,
        modelo_id: newId,
        color_id: req.body.color,
      })
      
    })
  
    res.redirect("/");
  },  

  editar: function (req, res) {

    Promise.all([db.rodado.findByPk((req.params.id),
      {
        include: [{association: 'modelo'}, {association: 'color'}]
      }), 
      db.modelo.findAll(), 
      db.color.findAll(),
      db.usuario.findAll()
    ])
    .then(function ([rodado, modelo, color, usuario]) {
      // Pasa ambas consultas a la vista
      res.render("editarProducto", { rodado, modelo, color, usuario });
    }) 
  },

  actualizar:async function (req, res) {
   
    //---------------------------Carga en Cloudinary----------------------------------------// 
   if(req.file){

    const imageBuffer = req.file.buffer;
    const customFilename = `user-${Date.now()}${path.extname(req.file.originalname)}`;

    const uploadPromise = new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream({ resource_type: 'image', public_id: customFilename}, (error, result) => {
        if (error) {
          console.error('Error during upload:', error);
          reject(error);
        } else {
          console.log('Upload successful:', result);
          resolve(result);
        }
      });

    streamifier.createReadStream(imageBuffer).pipe(stream);
    });

    const uploadedImage = await uploadPromise;
  
    db.rodado.update({
      nombre: req.body.title,
      precio_hora: req.body.price,
      descripcion: req.body.desc,
      rodado: req.body.rodado,
      categ: req.body.vehiculo,
      usuario_id: req.body.usuario ,
      modelo_id: req.body.vehiculo,
      color_id: req.body.color,
      imagen: customFilename,
    
    },{
      where: {id: req.params.id}
    })
  
  } else {

    db.rodado.update({
      nombre: req.body.title,
      precio_hora: req.body.price,
      descripcion: req.body.desc,
      rodado: req.body.rodado,
      categ: req.body.vehiculo,
      usuario_id: req.body.usuario ,
      modelo_id: req.body.vehiculo,
      color_id: req.body.color,
    },{
      where: {id: req.params.id}
    })
  }   
    res.redirect('../detalle/' + req.params.id);

  },

  borrar: function (req, res) {

    db.rodado.destroy({
        where: {
          id: req.params.id
        }
    })

    res.redirect('/');

  },

  carrito: function (req, res) {
    res.render("carrito");
  },
};

module.exports = pcontrolador;
