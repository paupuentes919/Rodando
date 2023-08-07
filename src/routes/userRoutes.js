//EXPRESS//
const express = require("express");
const router = express.Router();

//CONTROLADOR//
const userControllers = require("./../controllers/userControllers");

//MIDDLEWARE//
const uploadFile = require("./../middelwares/multerMiddleware");
const validations = require("./../middelwares/validateRegisterMiddleware");

//REGISTRO//
//Formulario de registro
router.get("/registro", userControllers.register);
//Proceso de registro
router.post(
  "/registro",
  uploadFile.single("avatar"),
  validations,
  userControllers.processRegister,
);

//LOGIN//
router.get("/login", userControllers.login);

module.exports = router;
