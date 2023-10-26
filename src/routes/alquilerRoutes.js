const alquilerRouter = require("express").Router();
const { alquilerController } = require("../controllers/alquilerController");

alquilerRouter.get("/", alquilerController.mostrarAlquileres);
alquilerRouter.get("/:id", alquilerController.mostrarAlquilerById);
alquilerRouter.put("/:id", alquilerController.editAlquiler);
alquilerRouter.post("/", alquilerController.postAlquiler);
alquilerRouter.delete("/:id", alquilerController.deleteAlquiler);

module.exports = { alquilerRouter };
