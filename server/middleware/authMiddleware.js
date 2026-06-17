// protects the routing in carrying the token for a verified/unverified user 

const jwt = require('jsonwebtoken');

const authenToken = (req, res, next) => {
    // 1) Look at the incoming request JSON body and look for "Authorization" header
    // 2) at header, take the jwt token by stripping additional information 
    // 3) verify the token in comparison to the secret jwt key 
    // 4) if the key is valid, put user info req.user and use next() to allow the request though middleware checkpoint 

    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({message: "!!Access Denied!! No token was provided"});
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({message: "Invalid/Expired Token"})
        }
         
        req.user = user;
        next(); // pass the request => verified the request
    });
};

module.exports = authenToken;