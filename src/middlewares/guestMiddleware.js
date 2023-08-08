//Middleware creado para NO permitir que un usuario logueado pueda acceder al login o al registro//

function gestMiddleware(req, res, next) {
  if (req.session.userLogged) {
    return res.redirect("/usuarios/perfil");
  }
  next();
}

module.exports = gestMiddleware;
