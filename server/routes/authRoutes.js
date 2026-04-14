// maps or routes the create account/register and login URLs to the right controller functions in controllers folder

const express = require('express');
const authControler = require('../controllers/authController'); // finds where the the controller file is at
const router = express.Router();

// user is trying to create an account, catches the request and goes to the registerUser function in authController file
router.post('/register', authControler.registerUser); 

// user is trying to login into account, catches the request and goes to the loginUser function in authController file
router.post('/login', authControler.loginUser);

module.exports = router;