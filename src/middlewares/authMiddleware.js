//Middleware creado para no poder acceder al login una vez logueado//

function authMiddleware(req, res, next) {
  if (((req.session.userLogged) || (req.session.adminLogged))) {
    return res.redirect("/usuarios/perfil");
  }
  next();
}

module.exports = authMiddleware;
