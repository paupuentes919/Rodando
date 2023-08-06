const userControllers = require("./../controllers/userControllers");
const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const { body } = require("express-validator");

/* configuración del almacenamiento de multer */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/img/avatars"));
  },
  filename: function (req, file, cb) {
    console.log(path.extname(file.originalname));
    const uniqueSuffix = Date.now();
    cb(null, "user-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const uploadFile = multer({ storage: storage });

//Validaciones de express-validator

const validations = [
  body("nombre").notEmpty().withMessage("*Campo obligatorio"),
  body("apellido").notEmpty().withMessage("*Campo obligatorio"),
  body("email")
    .notEmpty()
    .withMessage("*Campo obligatorio")
    .bail()
    .isEmail()
    .withMessage("*Formato de correo inválido"),
  body("contraseña").notEmpty().withMessage("*Campo obligatorio"),
  body("contraseña2").notEmpty().withMessage("*Campo obligatorio"),
  body("telefono").notEmpty().withMessage("*Campo obligatorio"),
  body("direccion").notEmpty().withMessage("*Campo obligatorio"),
  body("avatar").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".png", ".gif"];
    if (!file) {
      throw new Error("Debe subir una imagen");
    } else {
      let fileExtensions = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtensions)) {
        throw new Error(
          `Las extensiones permitidas son:${acceptedExtensions.join(", ")} `,
        );
      }
    }
  }),
];

/*---------Registro----------*/
//Formulario de registro
router.get("/registro", userControllers.register);
//Proceso de registro
router.post(
  "/registro",
  uploadFile.single("avatar"),
  validations,
  userControllers.processRegister,
);

/*---------Login----------*/
router.get("/login", userControllers.login);

module.exports = router;
