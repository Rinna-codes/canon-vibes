const mongoResponse = require('mongoose'); // requires mongoose to use

 async function connectToDatabase() {
    const uri = process.env.MONGODB_URI; // retrieve the MongoDB conn. string in .env file 

    try {
        const response = await mongoResponse.connect(uri); // connect the database through the string 
        console.log("Connection to MongoDB was successful!"); 
    } catch(error) {
        console.error("Connection to MongoDB failed:", error);
    }
}

module.exports = connectToDatabase;