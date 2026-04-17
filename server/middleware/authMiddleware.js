// TODO: create the middleware function that protects and extracts from the request from frontend

// 1) Look at the incoming request JSON body and look for "Authorization" header
// 2) at header, take the jwt token by stripping additional information 
// 3) verify the token in comparison to the secret jwt key 
// 4) if the key is valid, put user info req.user and use next() to allow the request though middleware checkpoint 
// 5) if anything is invalid or missing, need to send back a 401 status message 