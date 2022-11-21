const Quote=require("../models/quote.model");

async function getRandomQuote(req, res, next){
    const randomQuote=Quote.getRandomQuote();
    res.json({
        quote:randomQuote
    })
}

module.exports={getRandomQuote:getRandomQuote};