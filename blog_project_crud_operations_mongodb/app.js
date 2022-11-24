const path = require("path");

const express = require("express");

const blogRoutes = require("./routes/blog");
const db = require("./data/database");

const app = express();
let port = 3000;

if (process.env.PORT) {
  port = process.env.PORT;
}
// Activate EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true })); // Parse incoming request bodies

//for parsing all incoming JSON requests
app.use(express.json());
app.use(express.static("public")); // Serve static files (e.g. CSS files)
app.use("/images", express.static("images"));


app.use(blogRoutes);

//Route for handling the routes which are not present in the site
app.use(function notFoundHandler(req, res) {
  res.render("404");
});

app.use(function (error, req, res, next) {
  // Default error handling function for handling server side errors
  // Will become active whenever any route / middleware crashes
  console.log(error);
  res.status(500).render("500");
});

db.connectToDatabase().then(function () {
  app.listen(port);
});
