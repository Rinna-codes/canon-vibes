// handles the functions and logic for registering + logging in (aka authentication)

const bcrypt = require('bcrypt'); // need for hashing the passwords (for security purposes)
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (req, res) => {
    // takes the new credentials from the client requests
    // checks if the user already exists
    // hashes the user's password
    // save the new user to the MongoDB database
    // send a response back to client/user for acnknowledgement for user registration

    try {
        const {username, email, password} = req.body; 
        const existingUser = await User.findOne({email});

        if (existingUser) {
            return res.status(400).json({error: 'Email found in used for an existing user'});
        }

        const hashedPassword = await bcrypt.hash(password, 10); // hash the password with 10 salt rounds
        const saveNewUser = await User.create({username: username, email: email, password: hashedPassword});

        res.status(201).json({message: 'New Soundtrack Card User Created!'});
    } catch (err) {
        console.error(err); 
        res.status(500).json({message:"Whoops! Something went wrong with registering 😱"});
    }
};

const loginUser = async (req, res) => {
    // extract the email and password from client requests 
    // find the email in the database for existing user, if nothing, respond with error message 
    // compare the requested password to verify if in database, otherwise send back an error message if not found 
    // when both successful in verification, send/respond with the jwt token to authenticated user  

    try {
        const {email, password} = req.body;
        const existingEmail = await User.findOne({email});

        if (!existingEmail) { 
            return res.status(400).json({error: 'There is no email found'});
        }

        const comparePwd = await bcrypt.compare(password, existingEmail.password)

        if (!comparePwd) { 
            return res.status(400).json({error: 'Incorrect password'});
        }

        // generate the json web token for user authentication
        const token = jwt.sign(
            {id: existingEmail._id}, // payload 
            process.env.JWT_SECRET, // secret jwt key 
            {expiresIn: '7d' }
        )

        res.status(200).json({token, username: existingEmail.username});

    } catch (err) {
        console.error(err);
        res.status(500).json({message:"Whoops! Something went wrong with the logging in 😱"});
    }
};

module.exports = {registerUser, loginUser};