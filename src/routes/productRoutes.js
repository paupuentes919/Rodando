const productControllers = require('./../controllers/productControllers')

const express = require('express');

const router = express.Router();

router.get("/carrito",productControllers.carrito);

router.get("/detalle",productControllers.detalle);

module.exports = router;