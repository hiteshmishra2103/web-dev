const { Router } = require("express");
const express=require("express");

const quotesController=require("../controllers/quotes.controller");

router=express.Router();

router.get("/", quotesController.getRandomQuote);

module.exports=router;