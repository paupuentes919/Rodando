const alquilerRouter = require("express").Router();
const { alquilerController } = require("../controllers/alquilerController");

alquilerRouter.get("/", alquilerController.mostrarAlquileres);
alquilerRouter.get("/:id", alquilerController.mostrarAlquilerById);
alquilerRouter.post("/", alquilerController.postAlquiler);

module.exports = { alquilerRouter };
