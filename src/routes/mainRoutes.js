const express = require('express');
const router = express.Router();
const mainControllers = require('./../controllers/mainControllers');

/* Home */
router.get("/", mainControllers.home);

module.exports = router;