const express = require('express');
const cardController = require('../controllers/cardController');
const authToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authToken, cardController.createNewCard); // user creates a card
router.delete('/:id', authToken, cardController.deleteCard); // user deletes a card 
router.get('/:id', authToken, cardController.getCardById); // user clicks on card to its soundtrack card page
router.put('/:id', authToken, cardController.updateCard); // user can edit/update card
router.get('/', authToken, cardController.collectAllCards); // get all the cards

module.exports = router;