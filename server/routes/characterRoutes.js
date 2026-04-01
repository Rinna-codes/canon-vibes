const express = require('express');
const characterController = require('../controllers/characterController');

const router = express.Router(); // defines a router for character objects 

// maps the GET request at /search to get searchCharacters function in characterController js file 
router.get('/search', characterController.searchCharacters);

module.exports = router; // exports the router 