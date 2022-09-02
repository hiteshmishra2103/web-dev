const path = require("path");

const fileSystem = require("fs");

const express = require("express");

const app = express();

/*Adding ejs template engine*/

app.set("views", path.join(__dirname, "views"));
//the path above is to the folder which contains the template files which will be 
//processed then by template engine.

app.set("view engine", "ejs");
//first argument is "view engine" which is a option which tell express that we want to use a special engine
//a so called a template engine for processing our view files before we sent as HTML
//and Second argument is the name of the template engine which in this case is "ejs"

/*ejs template engine added*/

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.get("/", function (request, response) {
  response.render("index");
});

app.get("/restaurants", function (request, response) {
  const filePath = path.join(__dirname, "restaurantsdata", "restaurantdata.json");
  const restaurantData=JSON.parse(fileSystem.readFileSync(filePath));
  const numberOfRestaurants=JSON.parse(fileSystem.readFileSync(filePath)).length;
  response.render("restaurants", {numberOfRestaurants:numberOfRestaurants, restaurantdata:restaurantData});
});

app.get("/about", function (request, response) {
  response.render("about");
});

app.get("/confirm", function (request, response) {
  response.render("confirm");
});

app.get("/recommend", function (request, response) {
 response.render("recommend");
});


app.post("/recommend", function (request, response) {
  const restaurantData = request.body;
  const filePath = path.join(__dirname, "restaurantsdata", "restaurantdata.json");
  const existingRestaurantData = JSON.parse(fileSystem.readFileSync(filePath));
  existingRestaurantData.push(restaurantData);

  fileSystem.writeFileSync(filePath, JSON.stringify(existingRestaurantData));
  response.redirect("/confirm");
});

app.listen(3000);
