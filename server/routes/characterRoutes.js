const express = require('express');
const characterController = require('../controllers/characterController');

const router = express.Router(); // defines a router for character objects 

// maps the request at /search to get to searchCharacters function in characterController file 
router.get('/search', characterController.searchCharacters);

module.exports = router; // exports the router 