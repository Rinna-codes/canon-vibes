const mongoose = require('mongoose');

// define schema for user 
const userSchema = new mongoose.Schema({
    username : {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
});

// create mongoose model for schema for the user
module.exports = mongoose.model('User', userSchema); 