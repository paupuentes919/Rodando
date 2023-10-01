//EXPRESS//
const express = require("express");
const router = express.Router();
const multer = require("multer");

//CONTROLADOR//
const userControllers = require("./../controllers/userControllers");

//MIDDLEWARE//
const validations = require("../middlewares/validateUserMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");
const guestUserMiddleware = require("../middlewares/guestUserMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

//MULTER CONFIG//
const uploadFile = multer();

//REGISTRO//
//Formulario de registro de Usuarios
router.get("/registro", guestMiddleware, userControllers.register);
//Proceso de registro
router.post("/registro", uploadFile.single("imagen"), validations, userControllers.processRegister,);

//LOGIN//
//Formulario de logIn
router.get("/login", authMiddleware, userControllers.login);
//Proceso de LogIn
router.post("/login", userControllers.loginProcess);

//PERFIL USUARIO Y ADMIN
//perfil Usuario
router.get("/perfil", guestUserMiddleware, userControllers.profile);
//logout de perfil
router.get("/logout", userControllers.logout);

//Ver todos los usuarios
router.get("/", userControllers.vistaUsuarios);
//Editar usuario
router.get("/editar/:id", guestMiddleware, userControllers.vistaEditarUsuario);

router.put("/editar/:id", uploadFile.single("imagen"), validations, userControllers.editarUsuario);



//Borrar usuario
router.delete("/:id", userControllers.eliminarUsuario);

module.exports = router;
