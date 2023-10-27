const { body } = require("express-validator");
const path = require("path");

const validations = [
  body("title").notEmpty().bail(),
  body("vehiculo").notEmpty().bail(),
  body("rodado").notEmpty().bail(),
  body("price").notEmpty().isNumeric().bail(),
  body("usuario").notEmpty().bail(),
  body("desc").notEmpty().bail(),
  body("imagen").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".png", ".gif", ".jpeg"];
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
    return true;
  }),
];

module.exports = validations;
