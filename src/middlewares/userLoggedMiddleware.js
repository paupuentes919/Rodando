function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;

  next();
}

module.exports = userLoggedMiddleware;
