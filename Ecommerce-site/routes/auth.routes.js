//Here is the authorisation routes are handled

//importing express package
const express = require("express");

// storing the router() from express package to router constant
const router = express.Router();

//importing custom auth controller function which is responsible for authorisation related functions
const authController = require("../controllers/auth.controller");


//route for handling /signup get request
router.get("/signup", authController.getSignup);

//route for handling /signup post request
router.post("/signup", authController.signup);

//route for handling /login get request
router.get("/login", authController.getLogin);

//route for handling /login post request
router.post("/login", authController.login);

//route for handling /logout post request
router.post("/logout", authController.logout);

//exporting the router, so that other files could access the get and post routes using
//the router method
module.exports = router;
