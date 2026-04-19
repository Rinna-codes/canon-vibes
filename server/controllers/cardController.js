// contains the function that creates and views the soundtrack cards

const Card = require('../models/Card');

const createNewCard = async (req, res) => {
    // 1) get the new card data from user 
    // 2) check if data is valid 
    // 3) save new card into the database
    
    try {
        const cardData = req.body; 
        const userID = req.user.id;
        
        if (!cardData) {
            return res.status(401).json({message: "Error! Could not grab card data"});
        }

        // unpack card data from request body and saves card data into the Mongo database
        const createCard = await Card.create({...cardData, user : userID}); 

        res.status(201).json({message: 'New Soundtrack Card Created! Yay!'});
    } catch (err) {
        console.error(err);
        res.status(500).json({message:"Whoops! Something went wrong with the creating a card 😱"});
    }
};

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

module.exports = {createNewCard, collectAllCards};