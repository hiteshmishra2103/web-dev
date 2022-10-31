const path = require("path");

const csrf = require("csurf");

const express = require("express");

const db = require("./data/database");

const addCSRFTokenMiddleware = require("./middlewares/csrf-token");

const errorHandlerMiddleware=require("./middlewares/error-handler");

const authRoutes = require("./routes/auth.routes"); //importing custom authRoutes package

const app = express();

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(csrf());

app.use(addCSRFTokenMiddleware)

app.use(authRoutes);

app.use(errorHandlerMiddleware);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Failed to connect to the database!");
    console.log(error);
  });

