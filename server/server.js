require('dotenv').config(); // loads the .env file into process.env to get api key
const express = require('express');
const characterRoutes = require('./routes/characterRoutes');

const app = express(); // creates an express instance object
app.use('/api/characters', characterRoutes); // tell app to use this relative path to the right route 

// app listens from a 3000 port, a numbered channel
// () is a callback function that runs once the server successfully starts  
app.listen(3000, () =>{
    console.log("Server is running on port 3000!");
});
