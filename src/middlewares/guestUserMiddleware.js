//Middleware creado para bloquear el acceso de un usuario NO logueado al perfil y a la modificacion de productos//

function guestUserMiddleware(req, res, next) {
    if (!((req.session.userLogged) || (req.session.adminLogged))){
      return res.redirect("/");
    }
    next();
  }
  
  module.exports = guestUserMiddleware;
  