const userControllers = require('./../controllers/userControllers')

const express = require('express');

const router = express.Router();

router.get("/login",userControllers.login);

router.get("/registro",userControllers.register);

module.exports = router;