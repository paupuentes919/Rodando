const express = require("express");
const path = require("path");
const multer = require("multer");
const router = express.Router();
const productControllers = require("./../controllers/productControllers");

/* configuración del almacenamiento de multer */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../../public/img'));
    },
      filename: function (req, file, cb) {
        console.log(path.extname(file.originalname))
        const uniqueSuffix = Date.now();
      cb(null, "product-" + uniqueSuffix + path.extname(file.originalname));
    },
  });
  
const upload = multer({ storage: storage });

/* Bicicletas */
router.get("/bicicletas", productControllers.bicicletas);
/* Monopatines */
router.get("/monopatines", productControllers.monopatines);

/* Detalle de un producto (bicicleta o monopatin) */
router.get("/detalle/:id", productControllers.detalle);

/*---------------- Formulario -------------------- */
/* Form create */
router.get("/crear", productControllers.crearVista);
router.post("/crear", upload.single('imagen'), productControllers.crearItemEnJSON);

/* Form update */
router.get("/editar/:id", productControllers.editar);
router.put("/editar/:id", productControllers.actualizar);


/* Form delete */


/* Carrito */
router.get("/carrito", productControllers.carrito);

module.exports = router;