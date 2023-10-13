const { apiController } = require("../../controllers/API/apiController");

const apiRouter = require("express").Router();

apiRouter
  .get("/users", apiController.getUsers)
  .get("/users/:id", apiController.getUserById)
  .get("/products", apiController.getProducts)
  .get("/products/:id", apiController.getProductById)
  .get("/categories", apiController.getCategories);

module.exports = apiRouter;
