const express = require('express');
const router = express.Router();
//controller path
const controller = require('../controller/controller');

router.get('/home', controller.home);

// signup routes
router.post('/signup', controller.signup);

// login routes
router.post('/login', controller.login);

// login verify routes
router.get('/verify', controller.verify)

module.exports = router;