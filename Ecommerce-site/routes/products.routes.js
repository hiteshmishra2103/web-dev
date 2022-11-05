//This file contains the routes for handling product related requests

//importing express packageS
const express = require("express");
const adminController = require("../controllers/admin.controller");

// storing the router() from express package to router constant
const router = express.Router();

const authController = require("../controllers/auth.controller");

//This route will handle the get request for /products
router.get("/products", function (req, res) {
  res.render("customer/products/all-products");
});

module.exports=router;

