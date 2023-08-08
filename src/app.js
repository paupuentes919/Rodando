/* requiero express */
const express = require("express");
const app = express();
/* requiero path */
const path = require("path");

/* requiriendo session */
const session = require("express-session");
app.use(
  session({
    secret: "It's a secret",
    resave: false,
    saveUninitialized: false,
  }),
);
/* requiriendo cookie parser*/
const cookies = require("cookie-parser");

/* requiriendo middleware userLoggedMiddleware */
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");

app.use(userLoggedMiddleware);

/* requiero methodOverride */
const methodOverride = require("method-override");

/* static folder */
app.use(express.static(path.join(__dirname, "../public")));
/* bootstrap css y js */
app.use(
  "/nmb",
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css")),
);
app.use(
  "/scripts",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")),
);

/* ejs view engine */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* routes */
const mainRoutes = require("./routes/mainRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

/* form config */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/* Configurar metodos put delete patch */
app.use(methodOverride("_method"));

/* implementacion de routes */
app.use("/", mainRoutes);
app.use("/productos", productRoutes);
app.use("/usuarios", userRoutes);

/* puerto */
app.listen(3010, function (req, res) {
  console.log("Servidor en puerto 3010 corriendo");
});
