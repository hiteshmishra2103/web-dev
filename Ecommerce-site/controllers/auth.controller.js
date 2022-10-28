function getSignup(req, res, next) {
    res.render("customer/auth/signup");
}

function getLogin(req,res, next){
    //..
}
module.exports = { 
    getSignup: getSignup,
    getLogin:getLogin
};
