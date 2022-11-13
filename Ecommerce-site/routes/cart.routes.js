//Here is the authorisation routes are handled

//importing express package
const express = require("express");

// storing the router() from express package to router constant
const router = express.Router();

const cartController = require("../controllers/cart.controller");

router.get("/", cartController.getCart); // 👉/cart/


router.post("/items", cartController.addCartItem);// /cart/items 

//exporting the router, so that other files could access the get and post routes using
//the router method
module.exports = router;
