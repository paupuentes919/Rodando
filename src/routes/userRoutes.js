//EXPRESS//
const express = require('express');
const router = express.Router();
const multer = require('multer');

//CONTROLADOR//
const userControllers = require("./../controllers/userControllers");

//MIDDLEWARE//
const validations = require("../middlewares/validateRegisterMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");
const guestUserMiddleware = require("../middlewares/guestUserMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

//MULTER CONFIG//
const uploadFile = multer();

//REGISTRO//
//Formulario de registro de Usuarios
router.get("/registro", guestMiddleware,  userControllers.register);
//Proceso de registro
router.post(
  "/registro",
  uploadFile.single("avatar"),
  validations,
  userControllers.processRegister,
);

//LOGIN//
//Formulario de logIn
router.get("/login" , authMiddleware, userControllers.login);
//Proceso de LogIn
router.post("/login", userControllers.loginProcess);

//PERFIL USUARIO Y ADMIN
//perfil Usuario
router.get("/perfil", guestUserMiddleware, userControllers.profile);
//logout de perfil
router.get("/logout", userControllers.logout);

module.exports = router;
