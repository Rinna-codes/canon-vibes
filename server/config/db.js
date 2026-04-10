// only for establishing connection with the MongoDB

const mongoResponse = require('mongoose'); // brings in mongoose 

 async function connectToDatabase() {
    const uri = process.env.MONGODB_URI; // get MongoDB connection string from .env

    try {
        const response = await mongoResponse.connect(uri); // connect to the database through the connection string 
        console.log("Connection to MongoDB was successful!"); // logs into terminal
    } catch(error) {
        console.error("Connection to database failed:", error);
    }
}

module.exports = connectToDatabase;