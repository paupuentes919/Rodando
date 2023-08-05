const userControllers = require('./../controllers/userControllers')
const express = require('express');
const router = express.Router();
const multer = require('multer');

/* configuración del almacenamiento de multer */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../../public/img/avatars'));
    },
      filename: function (req, file, cb) {
        console.log(path.extname(file.originalname))
        const uniqueSuffix = Date.now();
      cb(null, "user-" + uniqueSuffix + path.extname(file.originalname));
    },
  });
  
const uploadFile = multer({ storage: storage });



/*---------Registro----------*/
//Formulario de registro
router.get("/registro",userControllers.register);
//Proceso de registro
router.post("/registro",uploadFile.single('avatar'), userControllers.processRegister);

/*---------Login----------*/
router.get("/login",userControllers.login);


module.exports = router;