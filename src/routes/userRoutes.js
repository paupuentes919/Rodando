//EXPRESS//
const express = require("express");
const router = express.Router();

//CONTROLADOR//
const userControllers = require("./../controllers/userControllers");

//MIDDLEWARE//
const uploadFile = require("../middlewares/multerMiddleware");
const validations = require("../middlewares/validateRegisterMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

//REGISTRO//
//Formulario de registro
router.get("/registro", guestMiddleware, userControllers.register);
//Proceso de registro
router.post(
  "/registro",
  uploadFile.single("avatar"),
  validations,
  userControllers.processRegister,
);

//LOGIN//
//Formulario de logIn
router.get("/login", guestMiddleware, userControllers.login);
//Proceso de LogIn
router.post("/login", userControllers.loginProcess);

//PERFIL USUARIO Y ADMIN
//perfil Usuario
router.get("/perfil", authMiddleware, userControllers.profile);
//logout de perfil
router.get("/logout", authMiddleware, userControllers.logout);

module.exports = router;
