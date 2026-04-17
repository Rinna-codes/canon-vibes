// has the functions for the registering and login logic 

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (req, res) => {
    // check if the user already exist
    // hash the password
    // save the new user to the MongoDB
    // send a response back to client/user

    try {
        const {username, email, password} = req.body;
        const existingUser = await User.findOne({email}); // user findOne() mongoose method to find existing user

        if (existingUser) { 
            return res.status(400).json({error: 'Email already in used for an existing user'});
        }

        const hashedPassword = await bcrypt.hash(password, 10); // hash the password with 10 salt rounds
        const saveNewUser = await User.create({username: username, email: email, password: hashedPassword}); // saves user credentials to MongoDB

        res.status(201).json({message: 'New Soundtrack Card User Created! Yay!'});
    } catch (err) {
        console.error(err); // displays the exact error that is caught 
        res.status(500).json({message:"Whoops! Something went wrong with the registering 😱"});
    }
};

// TODO: create login controller function
const loginUser = async (req, res) => {
    // extract the email and password from request 
    // find the email in the mongo database for existing user, if nothing gets back respond with error message 
    // compare the requested password to verify if in database, otherwise send back an error message if not found 
    // when both successful in verification, send/respond with the jwt token  

    try {
        const {email, password} = req.body;
        const existingEmail = await User.findOne({email});

        if (!existingEmail) { // is existing email doesn't exist in database, send error 
            return res.status(400).json({error: 'There is no email found'});
        }

        const comparePwd = await bcrypt.compare(password, existingEmail.password) // compares the entered password with existing users hashed password

        if (!comparePwd) { // if existing password is wrong/doesn't exist, send error 
            return res.status(400).json({error: 'There is no password found'});
        }

        // generate the json web token 
        const token = jwt.sign(
            {id: existingEmail._id}, // payload 
            process.env.JWT_SECRET, // secret jwt key 
            {expiresIn: '7d' }
        )

        res.status(200).json({token})
    } catch (err) {
        console.error(err); // displays the exact error that is caught 
        res.status(500).json({message:"Whoops! Something went wrong with the logging in 😱"});
    }
};

module.exports = {registerUser, loginUser};