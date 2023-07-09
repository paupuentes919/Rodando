const express = require('express');
const router = express.Router();
const mainControllers = require('./../controllers/mainControllers');

/* Home */
router.get("/", mainControllers.home);
/* Bicicletas */
router.get("/bicicletas", mainControllers.bicicletas);
/* Monopatines */
router.get("/monopatines", mainControllers.monopatines);

module.exports = router;