// contains the middleware function that protects the routing in carrying the token for a verified/unverified user 

const jwt = require('jsonwebtoken');

const authenToken = (req, res, next) => {
    // 1) Look at the incoming request JSON body and look for "Authorization" header
    // 2) at header, take the jwt token by stripping additional information 
    // 3) verify the token in comparison to the secret jwt key 
    // 4) if the key is valid, put user info req.user and use next() to allow the request though middleware checkpoint 
    // 5) if anything is invalid or missing, need to send back a 401 status message 

    // get the token from the header of the request
    const authHeader = req.headers['authorization'];

    // extracts the token exactly from the header of the request body 
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({message: "!!Access Denied!! No token was provided"});
    }

    // vertification of the retrieved token 
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({message: "Invalid/Expired Token"})
        }
         
        req.user = user;
        next(); // pass the request => it is verified of who made the request 
    });
};

module.exports = authenToken;