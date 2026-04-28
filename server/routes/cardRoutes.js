const express = require('express');
const cardController = require('../controllers/cardController');
const authToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authToken, cardController.createNewCard); // user creates a card
router.delete('/:id', authToken, cardController.deleteCard); // user deletes a card 
router.get('/', authToken, cardController.collectAllCards); // get all the cards

module.exports = router;