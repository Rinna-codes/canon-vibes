const axios = require('axios');

const searchCharacters = async (req, res) => {
    // Logic below in plain English
    // 1) Get the search term from the query string on thr req -> req.query
    // 2) Make the comic vince URL -> https://comicvine.gamespot.com/api/characters/?api_key={YOUR_KEY}&format=json&filter=name:Spider-Man&field_list=id,name,real_name
    // 3) Make a HTTP request using axios 
    // 4) complete promise using async and await 
    // 5) send back the response through res  -> res.json()
    try {
        const name = req.query.name; // getting the search term 
        const URL = `https://comicvine.gamespot.com/api/characters/?api_key=${process.env.COMIC_VINE_API_KEY}&format=json&filter=name:${name}&field_list=id,name,image,real_name`;

        const response = await axios.get(URL); // makes the HTTP request 
        res.json(response.data.results); // sends back the data as a response
    } catch (error) {
        console.log(err); // displays the exact error that is caught 
        res.status(500).json({message:"Whoops! Something went wrong with the server 😱"});
    };
};

module.exports = {searchCharacters};