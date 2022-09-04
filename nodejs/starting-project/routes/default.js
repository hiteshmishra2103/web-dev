const express = require("express");
const { __esModule } = require("uuid");

const router = express.Router();

router.get("/", function (request, response) {
  response.render("index");
});

router.get("/about", function (request, response) {
  response.render("about");
});

router.get("/confirm", function (request, response) {
  response.render("confirm");
});

router.get("/recommend", function (request, response) {
  response.render("recommend");
});

module.exports=router;
