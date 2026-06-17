const express = require('express');
const cardController = require('../controllers/cardController');
const authToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authToken, cardController.createNewCard);
router.delete('/:id', authToken, cardController.deleteCard);
router.get('/:id', authToken, cardController.getCardById);
router.put('/:id', authToken, cardController.updateCard);
router.get('/', authToken, cardController.collectAllCards);

module.exports = router;