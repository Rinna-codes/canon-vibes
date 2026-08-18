// contains the functions that creates and views the soundtrack cards to the user

const Card = require('../models/Card');

const createNewCard = async (req, res) => {
    // 1) get the new card data from client requests
    // 2) check if the card data is valid 
    // 3) save new card into the database
    
    try {
        const cardData = req.body; 
        const userID = req.user.id;
        
        if (!cardData) {
            return res.status(401).json({message: "Error! Could not grab card data"});
        }

        // unpack the card's data from request body and saves card data into database
        const createCard = await Card.create({...cardData, user : userID}); 

        res.status(201).json({message: 'New Soundtrack Card Created! Yay!'});
    } catch (err) {
        console.error(err);
        res.status(500).json({message:"Whoops! Something went wrong with the creating a card 😱"});
    }
};

const deleteCard = async (req, res) => {
    // verify the card's user with req.user.id
    // identify the card that user requests to delete using req.params.id
    // send back a success as response 

    try {
        const cardID = req.params.id;
        const userID = req.user.id; 
        const card = await Card.findById(cardID); // find the card user wishes to delete

        if (!card) {
            return res.status(404).json({message: "Cannot find the card to delete!"});
        }

        if (card.user.toString() !== userID) { // verifies the user if the correct one who can delete the selected card
            return res.status(403).json({message: "This is not your card to delete!"});
        }

        const deleteCard = await Card.findByIdAndDelete(cardID);
        res.status(200).json({message: "Deletion successful"});

    } catch (err) {
        console.error(err);
        res.status(500).json({message:"Whoops! Something went wrong with the deleting a card 😱"});
    }
}

const getCardById = async (req, res) => {
    // 1) get the card by id
    // 2) find the card using Card.findById
    // 3) send back the card as a response

    try {
        const cardID = req.params.id;
        const card = await Card.findById(cardID);

        if (!card) {
            return res.status(404).json({message: "Cannot find the card!"});
        }

        res.status(200).json({card});
    } catch (err) {
        console.error(err);
        res.status(500).json({message:"Whoops! Unable to find card by id 😱"});
    }
}

const updateCard = async (req, res) => {
    // 1) get the card by id
    // 2) find the card using Card.findByIdAndUpdate
    // 3) check if there is card to edit to begin with
    // 4) send bad as a response 

     try {
        const cardID = req.params.id;
        const userID = req.user.id;
        const verifyCard = await Card.findById(cardID);

        if (!verifyCard) {
            return res.status(404).json({message: "Cannot find the card to edit!"});
        }

        if (verifyCard.user.toString() !== userID) { 
            return res.status(403).json({message: "You have no card to edit!"});
        }

        const card = await Card.findByIdAndUpdate(cardID, req.body, { new: true });

        res.status(200).json({card});
    } catch (err) {
        console.error(err);
        res.status(500).json({message:"Whoops! Unable to find card by id that you wish to edit😱"});
    }
}

const collectAllCards = async (req, res) => {
    // 1) grab the user's ID 
    // 2) get all cards that match the user
    // 3) send back response to the user 

    try {
        const userID = req.user.id;

        const getCards = await Card.find({user: userID});

        res.status(200).json(getCards); // send back all the cards for the user 
    } catch (err) {
        console.error(err);
        res.status(500).json({message:"Whoops! Unable to fetch your cards 😱"});
    }
};

module.exports = {createNewCard, deleteCard, getCardById, updateCard, collectAllCards};