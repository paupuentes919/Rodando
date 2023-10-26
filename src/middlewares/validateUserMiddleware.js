const { body } = require("express-validator");
const path = require("path");

const validations = [
  body("nombre").notEmpty().withMessage("*Campo obligatorio"),
  body("apellido").notEmpty().withMessage("*Campo obligatorio"),
  body("email")
    .notEmpty()
    .withMessage("*Campo obligatorio")
    .bail()
    .isEmail()
    .withMessage("*Formato de correo inválido"),
  // body("contraseña").notEmpty().withMessage("*Campo obligatorio").bail(),
  // body("contraseña2").notEmpty().withMessage("*Campo obligatorio").bail(),
  body("telefono").notEmpty().withMessage("*Campo obligatorio"),
  body("direccion").notEmpty().withMessage("*Campo obligatorio"),
  body("avatar").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".png", ".gif"];
    if (file) {
      let fileExtensions = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtensions)) {
        throw new Error(
          `Las extensiones permitidas son:${acceptedExtensions.join(", ")} `,
        );
      }
    }
    return true;
  }),
];

module.exports = validations;
