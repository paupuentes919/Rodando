//Middleware creado para que solo los Admin del sistema puedan crear nuevos Usuarios//

function guestMiddleware(req, res, next) {
  if (!req.session.adminLogged) {
    return res.redirect("/");
  }
  next();
}

module.exports = guestMiddleware;
