var moment = require("moment");
const path = require("path");
const bcryptjs = require("bcryptjs");
const cloudinary = require("cloudinary").v2;
const db = require("../database/models");
const streamifier = require("streamifier");
const { validationResult } = require("express-validator");

cloudinary.config({
  cloud_name: "dkguig17n",
  api_key: "224877749259764",
  api_secret: "ul1tsDPqbMh9URQF2Ex5DRXcfOA",
});

const controlador = {
  register: function (req, res) {
    db.sucursal.findAll()
      .then(function(sucursales){
        return res.render("registro" , {sucursales})
      })
  },

  processRegister: async function (req, res) {
    //---------------------------Validaciones de express--------------------------------------//
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      return res.render("registro", {
       // errors: resultValidation.mapped(),
       // oldData: req.body,
      });
    }
    //---------------------------Validacion de usuario repetido-------------------------------//
    db.usuario
      .findOne({
        where: {
          email: req.body.email,
        },
      })
      .then(function (usuarioEnBD) {
        if (usuarioEnBD) {
          return res.render("registro", {
            errors: {
              email: { msg: "Esta dirección de correo ya está registrada" },
            },
            oldData: req.body,
          });
        }
      });

    //---------------------------Carga en Cloudinary----------------------------------------//

    const imageBuffer = req.file.buffer;
    const customFilename = `user-${Date.now()}${path.extname(req.file.originalname,)}`;

    const uploadPromise = new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        { resource_type: "image", public_id: customFilename },
        (error, result) => {
          if (error) {
            console.error("Error during upload:", error);
            reject(error);
          } else {
            console.log("Upload successful:", result);
            resolve(result);
          }
        },
      );

      streamifier.createReadStream(imageBuffer).pipe(stream);
    });

    const uploadedImage = await uploadPromise;

    //---------------------------Creacion de Usuario en BD-----------------------------------//

    db.usuario.create({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      telefono: req.body.telefono,
      clave: bcryptjs.hashSync(req.body.contrasena, 10),
      rol: req.body.rol,
      direccion: req.body.direccion,
      fecha_creacion: moment().format(),
      fecha_eliminacion: "",
      imagen: customFilename,
      sucursal_id: null,
    });

    res.redirect("/usuarios");
  
  },

  login: function (req, res) {
    return res.render("login");
  },

  loginProcess: function (req, res) {
    // User.encontrarUsuarioPorCampoBD(req.body.email)

    db.usuario
      .findOne({
        where: {
          email: req.body.email,
        },
      })
      .then(function (userToLogin) {
        if (userToLogin) {
          let contrasenaOk = bcryptjs.compareSync(
            req.body.contrasena,
            userToLogin.clave,
          );

          if (contrasenaOk) {
            //Se activa la session segun haya entrado un superadmin o un admin
            if (userToLogin.rol == "superadmin") {
              req.session.adminLogged = userToLogin;
            } else {
              req.session.userLogged = userToLogin;
            }

            //Se guarda la cookie en memoria del usuario logueado
            //para que no tengas que volver a loguearte si cerras el navegador
            if (req.body.recordarUsuario) {
              res.cookie("user", userToLogin, { maxAge: 1000 * 60 * 2 });
            }
            //console.log(req.session)
            return res.redirect("/usuarios/perfil");
          }

          return res.render("login", {
            errors: {
              contrasena: { msg: "La contraseña es inválida" },
            },
          });
        }
        return res.render("login", {
          errors: {
            email: {
              msg: "Este email no se encuentra registrado",
            },
          },
        });
      });
  },

  profile: function (req, res) {
    //console.log(req.cookies.userEmail);
    if (req.session.adminLogged) {
      return res.render("perfilUsuario", {
        user: req.session.adminLogged,
      });
    } else {
      return res.render("perfilUsuario", {
        user: req.session.userLogged,
      });
    }
  },

  logout: function (req, res) {
    res.clearCookie("userEmail");

    req.session.destroy();

    return res.redirect("/");
  },

  vistaUsuarios: async function (req, res) {
    let usuarios = [];
    await db.usuario
      .findAll({
        include: [{ association: "sucursal" }],
      })
      .then(function (data) {
        usuarios = data;
      });
    res.render("usuarios", { usuarios });
  },

  editarUsuario: async function (req, res) {

  //---------------------------Validaciones de express--------------------------------------//
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      return res.redirect(req.params.id);
    }

  //---------------------------Carga en Cloudinary----------------------------------------// 
  if(req.file){

    const imageBuffer = req.file.buffer;
    const customFilename = `user-${Date.now()}${path.extname(req.file.originalname)}`;

    const uploadPromise = new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream({ resource_type: 'image', public_id: customFilename}, (error, result) => {
        if (error) {
          console.error('Error during upload:', error);
          reject(error);
        } else {
          console.log('Upload successful:', result);
          resolve(result);
        }
      });

    streamifier.createReadStream(imageBuffer).pipe(stream);
    });

    const uploadedImage = await uploadPromise;
 
  db.usuario
    .findOne({ where: { id: req.params.id } })
    .then((usuarioAEditar) => {
      usuarioAEditar.update({ ...req.body, sucursal_id: req.body.sucursal, imagen:customFilename });
      return usuarioAEditar;
    })
    .then((data) => res.redirect("/usuarios"));
   
  } else {

    db.usuario
      .findOne({ where: { id: req.params.id } })
      .then((usuarioAEditar) => {
        usuarioAEditar.update({ ...req.body, sucursal_id: req.body.sucursal});
        return usuarioAEditar;
      })
      .then((data) => res.redirect("/usuarios"));

   }    
    
  },


  vistaEditarUsuario: async function (req, res) {
    await Promise.all([
      db.usuario.findOne({ where: { id: req.params.id } }),
      db.sucursal.findAll({ include: [{ association: "ciudad" }] }),
    ])
      .then(([usuario, sucursales]) => {
        res.render("editarUsuario", {
          usuario,
          sucursales,
        });
      })
      .catch((err) => {
        console.error(err);
        res.render("/usuarios");
      });
  },

  eliminarUsuario: async function (req, res) {
    console.log("borrando");
    await db.usuario
      .destroy({ where: { id: req.params.id } })
      .catch((error) => console.error(error));
    res.redirect("/usuarios");
  },
};

module.exports = controlador;
