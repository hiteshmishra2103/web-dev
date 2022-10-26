function addCSRFToken(req, res, next){
const csrfToken=req.csrfToken();
next();
}

module.exports=addCSRFToken;