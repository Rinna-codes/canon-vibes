const express = require('express');
const cardControler = require('../controllers/cardController');
const authToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authToken, cardControler.createNewCard); // user creates a card 
router.get('/', authToken, cardControler.collectAllCards); // get all the cards

module.exports = router;