const User = require("../models/User");
//Middleware creado para mostrar partes de la nav-bar si es que el usuario esta logueado o no// //aqui tambien estan la config de las cookies
function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;

  //EN ESTE TROZO DE CODIGO STEAMOS LAS COOKIES PARA MANTENER LA SESION INICIADA//
  let emailInCookie = req.cookies.userEmail;
  //console.log("holaaaaaaaaaa", emailInCookie)
  let userFromCookie = User.encontrarUsuarioPorCampo("email",emailInCookie);
  //console.log("ayuuuuuuda", userFromCookie)

  if (userFromCookie) {
    req.session.userLogged = userFromCookie;
  }
  //ESTE TROZO DE CODIGO COMENTADO ES PARA HACER LA COMPROBACION DEL USUARIO EN SESION Y MOSTARR PARTES DEL NAV-BAR
  if (req.session.adminLogged)  {
    res.locals.isLogged = true;
    res.locals.adminLogged = req.session.adminLogged;
  } if (req.session.userLogged)  {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
  }
  next();
}

module.exports = userLoggedMiddleware;
