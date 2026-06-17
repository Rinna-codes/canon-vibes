// handles the functions and logic for registering + logging in (aka authentication)

const bcrypt = require('bcrypt'); // need for hashing passwords (security purposes)
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (req, res) => {
    // takes the new credentials from the clients requests
    // check if the user already exist
    // hashes the password
    // save the new user to the MongoDB
    // send a response back to client/user

    try {
        const {username, email, password} = req.body; 
        const existingUser = await User.findOne({email});

        if (existingUser) { 
            return res.status(400).json({error: 'Email already in used for an existing user'});
        }

        const hashedPassword = await bcrypt.hash(password, 10); // hash the password with 10 salt rounds
        const saveNewUser = await User.create({username: username, email: email, password: hashedPassword});

        res.status(201).json({message: 'New Soundtrack Card User Created! Yay!'});
    } catch (err) {
        console.error(err); 
        res.status(500).json({message:"Whoops! Something went wrong with registering 😱"});
    }
};

const loginUser = async (req, res) => {
    // extract the email and password from clients requests 
    // find the email in the mongo database for existing user, if nothing gets back respond with error message 
    // compare the requested password to verify if in database, otherwise send back an error message if not found 
    // when both successful in verification, send/respond with the jwt token  

    try {
        const {email, password} = req.body;
        const existingEmail = await User.findOne({email});

        if (!existingEmail) { 
            return res.status(400).json({error: 'There is no email found'});
        }

        const comparePwd = await bcrypt.compare(password, existingEmail.password)

        if (!comparePwd) { 
            return res.status(400).json({error: 'There is no password found'});
        }

        // generate the json web token 
        const token = jwt.sign(
            {id: existingEmail._id}, // payload 
            process.env.JWT_SECRET, // secret jwt key 
            {expiresIn: '7d' }
        )

        res.status(200).json({token, username: existingEmail.username}); // returns token for successful token to authenticated user

    } catch (err) {
        console.error(err);
        res.status(500).json({message:"Whoops! Something went wrong with the logging in 😱"});
    }
};

module.exports = {registerUser, loginUser};