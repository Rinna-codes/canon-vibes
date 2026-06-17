// maps or routes the create account/register and login URLs to the functions in controllers folder

const express = require('express');
const authController = require('../controllers/authController'); // finds where the the controller file is at
const router = express.Router();

// routers to redirect user requests to respective functions in authController file
router.post('/register', authController.registerUser); 
router.post('/login', authController.loginUser);

module.exports = router;