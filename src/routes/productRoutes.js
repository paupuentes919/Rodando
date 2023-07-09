const express = require("express");
const router = express.Router();
const productControllers = require("./../controllers/productControllers");

router.get("/carrito", productControllers.carrito);

router.get("/detalle", productControllers.detalle);

router.get("/crear", productControllers.crear);

router.get("/editar", productControllers.editar);

module.exports = router;
