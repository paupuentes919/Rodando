const path = require("path");
const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const { validationResult } = require("express-validator");

const controlador = {
  register: function (req, res) {
    res.render("registro");
  },
  processRegister: function (req, res) {
    //Validaciones de express
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      res.render("registro", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }
    //validacion de usuario registrado con mismo mail//
    let usuarioEnBD = User.encontrarUsuarioPorCampo("email", req.body.email);
    if (usuarioEnBD) {
      return res.render("registro", {
        errors: {
          email: {
            msg: "Esta direccion de mail ya esta registrada",
          },
        },
        oldData: req.body,
      });
    }
    //-----------------------------------------------------------------//
    let userToCreate = {
      ...req.body,
      contrasena: bcryptjs.hashSync(req.body.contrasena, 10),
      avatar: req.file.filename,
    };

    User.crearUsuarioEnBD(userToCreate);
    return res.redirect("login");

    //-----------------------------------------------------------------//
    // let usuarioACrear = {
    //   nombre: req.body.nombre,
    //   apellido: req.body.apellido,
    //   email: req.body.email,
    //   contraseña: bcryptjs.hashSync(req.body.contraseña, 10),
    //   telefono: req.body.telefono,
    //   direccion: req.body.direccion,
    //   avatar: req.file.filename,
    // };

    // if (usuarioEnBD) {
    //   res.send("Usuario ya registrado!");
    // } else {
    //   User.crearUsuarioEnBD(usuarioACrear);
    //   res.redirect("/login");
    // }
  },

  login: function (req, res) {
    res.render("login");
  },

  loginProcess: function (req, res) {
    let userToLogin = User.encontrarUsuarioPorCampo("email", req.body.email);

    if (userToLogin) {
      let contrasenaOk = bcryptjs.compareSync(
        req.body.contrasena,
        userToLogin.contrasena,
      );
      if (contrasenaOk) {
        delete userToLogin.contrasena;
        req.session.userLogged = userToLogin;
        return res.redirect("/usuarios/perfil");
      }
      return res.render("login", {
        errors: {
          contrasena: {
            msg: "La contraseña es inválida",
          },
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
  },
  profile: function (req, res) {
    return res.render("perfilUsuario", {
      user: req.session.userLogged,
    });
  },
  logout: function (req, res) {
    req.session.destroy();

    return res.redirect("/");
  },
};

module.exports = controlador;
