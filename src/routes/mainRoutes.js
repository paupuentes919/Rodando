const mainControllers = require('./../controllers/mainControllers')

const express = require('express');

const router = express.Router();

router.get("/",mainControllers.home);

module.exports = router;