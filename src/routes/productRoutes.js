const express = require("express");
const path = require("path");
const multer = require("multer");
const router = express.Router();
const productControllers = require("./../controllers/productControllers");

//MIDDLEWARE//
const validations = require("../middlewares/validateProductMiddleware");
const guestUserMiddleware = require("../middlewares/guestUserMiddleware");

//MULTER CONFIG//
const upload = multer();


/* Bicicletas */

router.get("/bicicletas", productControllers.bicicletas);

/* Monopatines */

router.get("/monopatines", productControllers.monopatines);

/* Detalle de un producto (bicicleta o monopatin) */

router.get("/detalle/:id", productControllers.detalle);

/*---------------- Formulario -------------------- */
/* Form create */
router.get("/crear", guestUserMiddleware, productControllers.crearVista);
router.post("/crear", upload.single('imagen'), validations, productControllers.crearItemEnBD);

/* Form update */
router.get("/editar/:id", guestUserMiddleware, productControllers.editar);
router.put("/editar/:id",upload.single('imagen'), validations, productControllers.actualizar);


/* Form delete */

router.delete("/borrar/:id", guestUserMiddleware,  productControllers.borrar);

/* Carrito */
router.get("/carrito", productControllers.carrito);

module.exports = router;