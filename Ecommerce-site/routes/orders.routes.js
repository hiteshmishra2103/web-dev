//importing express package
const express = require("express");

const ordersController=require("../controllers/orders.controllers");

// storing the router() from express package to router constant
const router = express.Router();

router.post("/", ordersController.addOrder);//post request will be sent to /orders

router.get("/", ordersController.getOrders);

module.exports = router;
