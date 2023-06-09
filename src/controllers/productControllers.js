const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const productosPath = path.join(__dirname, "../database/productos.json");
/* leo un json y lo parseo */
const productos = JSON.parse(fs.readFileSync(productosPath, "utf-8"));

const pcontrolador = {
  bicicletas: function (req, res) {
    /* busco todas las bicicletas en la base de datos */
    const bici = productos.filter((bike) => bike.vehiculo === "Bicicleta");
    res.render("bicicletas", { bici });
  },
  monopatines: function (req, res) {
    /* busco todos los monopatines en la base de datos */
    const mono = productos.filter(
      (scooter) => scooter.vehiculo === "Monopatin"
    );
    res.render("monopatines", { mono });
  },
  detalle: function (req, res) {
    /* busco un producto en funcion de su ID */
    const product = productos.find((item) => item.id == req.params.id);
    if (product) {
      res.render("detalle", { product });
    }
  },

  crearVista: function (req, res) {
    res.render("crearProducto");
  },

  crearItemEnJSON: function (req, res) {
    /* creo una variable para generar el nuevo producto del req.body */
    let nuevoProducto = {
      id: uuidv4(), //uso de uuid para generar un id unico
      vehiculo: req.body.vehiculo,
      titulo: req.body.title,
      tipo: req.body.tipo,
      color: req.body.color,
      rodado: req.body.rodado,
      precio: req.body.price,
      descripcion: req.body.desc,
      /* if ternario para preguntar si viene imagen que la escriba, sino que se quede con la por default */
      imagen: req.file
        ? `/img/${req.file.filename}`
        : "/img/default-product.jpg",
    };
    /* agrego ese item al listado JSON*/
    productos.push(nuevoProducto);

    /* convierto a json nuevamente y escribo el archivo products.json */
    const productosJSON = JSON.stringify(productos, null, " ");
    fs.writeFileSync(productosPath, productosJSON);
    res.redirect("/");
  },

  editar: function (req, res) {
    let prod = productos.find((item) => item.id == req.params.id);
    res.render("editarProducto",{ prod });
  },

  actualizar: function (req, res) {
   
    idParaEditar = req.params.id;
    
      for(let p of productos){
        if(idParaEditar == p.id){
        p.titulo = req.body.title;
        p.precio = req.body.price;
        p.color = req.body.color;
        p.descripcion = req.body.description;
        p.imagen = "imagen";
        }
      };

    fs.writeFileSync(productosPath,JSON.stringify(productos, null, " "));

    res.redirect('/');

  },

  borrar: function (req, res) {
    idParaBorrar = req.params.id;
    nuevosProductos = productos.filter((e)=>{
      return e.id != idParaBorrar;
    });

    console.log(idParaBorrar)
    console.log(nuevosProductos)

    fs.writeFileSync(productosPath,JSON.stringify(nuevosProductos, null, " "));

    res.redirect('/');

  },

  carrito: function (req, res) {
    res.render("carrito");
  },
};

module.exports = pcontrolador;
