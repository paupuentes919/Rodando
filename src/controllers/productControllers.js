const fs = require("fs");
const path = require("path");
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const db = require ('../database/models');
const productosPath = path.join(__dirname, "../database/productos.json");
/* leo un json y lo parseo */
const productos = JSON.parse(fs.readFileSync(productosPath, "utf-8"));

cloudinary.config({
	cloud_name: 'dkguig17n',
	api_key: '224877749259764',
	api_secret: 'ul1tsDPqbMh9URQF2Ex5DRXcfOA',
});

const pcontrolador = {
  
  bicicletas: function(req, res){
  /* busco todas las bicicletas en la base de datos */
    db.rodado.findAll({
      where:{
        categoria_id: '1'
      }
    }).then(function(bici){
      res.render("bicicletas", { bici });
    })
  },
  
  monopatines: function (req, res) {
  /* busco todos los monopatines en la base de datos */
    db.rodado.findAll({
      where:{
        categoria_id: '2'
      }
    }).then(function(mono){
      res.render("monopatines", { mono });
    })
  },

  detalle: function (req, res) {
  /* busco un producto en funcion de su ID */
    db.rodado.findByPk(req.params.id , {
      include: [{association: 'categoria'}, {association: 'color'}]
    })
        .then(function(product){
          if (product) {
          res.render("detalle", { product });
          }
          else { res.redirect('/') }
        })     
  },
    
  crearVista: function (req, res) {
    Promise.all([db.categoria.findAll(), db.color.findAll(),db.usuario.findAll()])
    .then(function ([categoria, color, usuario]) {
      // Pasa ambas consultas a la vista
      res.render("crearProducto", { categoria, color, usuario });
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



    /* creo una variable para generar el nuevo producto del req.body */


    db.rodado.create({
      nombre: req.body.title,
      precio_hora: req.body.price,
      descripcion: req.body.desc,
      rodado: req.body.rodado,
      fecha_creacion: '2023-09-03',
      fecha_eliminacion: '2023-09-03',
      imagen: customFilename,
      usuario_id: req.body.usuario ,
      categoria_id: req.body.vehiculo,
      color_id: req.body.color,
    })
    
    res.redirect("/");
  },  
/*
    let nuevoProducto = {
      id: productos[productos.length-1].id + 1,
      vehiculo: req.body.vehiculo,
      titulo: req.body.title,
      tipo: req.body.tipo,
      color: req.body.color,
      rodado: req.body.rodado,
      precio: req.body.price,
      descripcion: req.body.desc,
      /* if ternario para preguntar si viene imagen que la escriba, sino que se quede con la por default 
      imagen: customFilename
    }
    /* agrego ese item al listado JSON
    await productos.push(nuevoProducto);

    /* convierto a json nuevamente y escribo el archivo products.json 
    const productosJSON = JSON.stringify(productos, null, " ");
    fs.writeFileSync(productosPath, productosJSON);
    res.redirect("/");
  },
 */
  editar: function (req, res) {

    Promise.all([db.rodado.findByPk((req.params.id),
      {
        include: [{association: 'categoria'}, {association: 'color'}]
      }), 
      db.categoria.findAll(), 
      db.color.findAll(),
      db.usuario.findAll()
    ])
    .then(function ([rodado, categoria, color, usuario]) {
      // Pasa ambas consultas a la vista
      res.render("editarProducto", { rodado, categoria, color, usuario });
    }) 
  },

  actualizar: function (req, res) {
   
    db.rodado.update({
      nombre: req.body.title,
      precio_hora: req.body.price,
      descripcion: req.body.desc,
      rodado: req.body.rodado,
      usuario_id: req.body.usuario ,
      categoria_id: req.body.vehiculo,
      color_id: req.body.color,
    
    },{
      where: {id: req.params.id}
    })

  /* 
    idParaEditar = req.params.id;
    
      for(let p of productos){
        if(idParaEditar == p.id){
        p.titulo = req.body.title;
        p.vehiculo = req.body.vehiculo;
        p.rodado = req.body.rodado;
        p.precio = req.body.price;
        p.color = req.body.color;
        p.descripcion = req.body.description;
          if(req.file){
            fs.unlinkSync(productosPath,p.imagen);
            p.imagen = req.file.filename;
          }
        }
      };

    fs.writeFileSync(productosPath,JSON.stringify(productos, null, " "));
  */    
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
