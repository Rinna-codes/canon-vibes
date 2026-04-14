// has the functions for the registering and login logic 

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (req, res) => {
    // check if the yser already exist
    // hash the password
    // save the new user to the MongoDB
    // send a response back to client/user

    try {
        const {username, email, password} = req.body;
        const existingUser = await User.findOne({email}); // user findOne() mongoose method to find user

        if (existingUser) {
            return res.status(400).json({error: 'Email already in used for an existing user'});
        }

        const hashedPassword = await bcrypt.hash(password, 10); // hash the password with 10 salt rounds
        const saveNewUser = await User.create({username: username, email: email, password: hashedPassword}); // saves user info to MongoDB

        res.status(201).json({message: 'New Soundtrack Card User Created! Yay!'});
    } catch (err) {
        console.error(err); // displays the exact error that is caught 
        res.status(500).json({message:"Whoops! Something went wrong with the registering 😱"});
    }
};

// TODO: create login controller function

module.exports = {registerUser};