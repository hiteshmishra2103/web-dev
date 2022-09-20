const express = require("express");
const router = express.Router();

const db=require("../data/database");

router.get("/", (request, response) => {
  response.redirect("/posts");
});

router.get("/posts", (request, response) => {
  response.render("posts-list");
});

router.get("/new-post", (request,response)=>{
    db.query("SELECT * FROM authors;");
    response.render("create-post");
});



module.exports = router;
