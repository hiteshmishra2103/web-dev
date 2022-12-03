
function enableCors(req, res, next) {
    //setting headers to allow any url to access this API
    res.setHeader("Access-Control-Allow-Origin","*");

    //settind header to unlock get, post, patch and delete requests 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");

    //which headers might be sent by client which sends the requests, here is the
    //Content-Type
    res.setHeader("Access-Control-Allow-Headers","Content-Type");

    next();

}

module.exports = enableCors;
