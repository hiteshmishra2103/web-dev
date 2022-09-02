const path = require("path");
const fileSystem = require("fs");
const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.get("/", function (request, response) {
  const homePage = path.join(__dirname, "frontend-site", "index.html");
  response.sendFile(homePage);
});
app.get("/restaurants", function (request, response) {
  const restaurantsPage = path.join(
    __dirname,
    "frontend-site",
    "restaurants.html"
  );
  response.sendFile(restaurantsPage);
});
app.get("/about", function (request, response) {
  const aboutPage = path.join(__dirname, "frontend-site", "about.html");
  response.sendFile(aboutPage);
});
app.get("/confirm", function (request, response) {
  const confirmPage = path.join(__dirname, "frontend-site", "confirm.html");
  response.sendFile(confirmPage);
});
app.get("/recommend", function (request, response) {
  const recommendedPage = path.join(
    __dirname,
    "frontend-site",
    "recommend.html"
  );
  response.sendFile(recommendedPage);
});

app.post("/recommend", function (request, response) {
  const restaurantData = request.body;
  const filePath = path.join(__dirname, "userdata", "restaurantdata.json");
  const existingRestaurantData = JSON.parse(fileSystem.readFileSync(filePath));
  existingRestaurantData.push(restaurantData);

  fileSystem.writeFileSync(filePath, JSON.stringify(existingRestaurantData));
  response.redirect("/confirm");
});
app.listen(3000);
