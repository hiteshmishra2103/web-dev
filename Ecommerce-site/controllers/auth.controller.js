const User = require("../models/users.models");

function getSignup(req, res, next) {
  res.render("customer/auth/signup");
}

async function signup(req, res) {
  const User = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );
  await User.signup();
  res.redirect("/login");
}

function getLogin(req, res, next) {
  res.render("customer/auth/login");
}
module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
};
