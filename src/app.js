const mainRoutes = require("./routes/mainRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "../public")));

app.use(
    "/nmb",
    express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css"))
);

app.use(
    "/scripts",
    express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);

app.use("/", mainRoutes);

app.use("/productos", productRoutes);

app.use("/usuarios", userRoutes);

app.listen(3010, function (req, res) {
    console.log("Servidor en puerto 3010 corriendo");
});
