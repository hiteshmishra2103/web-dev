const path = require("path");

const express = require("express");

const app = express();



const defaultRoutes=require('./routes/default');

const restaurantRoutes=require("./routes/restaurant");

const uuid=require("uuid");
const { response } = require("express");
const { getStoredRestaurants } = require("./util/restaurant-data");

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
//👆 line of code is used to serve static file with the help of a built-in static middleware
// which we can use to serve the content of a specific folder in this case, that is the
// public folder which contains style files and scripts. ⚠️ Make sure to put the files only
// which you want to be accessed by the user.
app.use(express.urlencoded({ extended: false }));

app.use("/", defaultRoutes);

app.use("/", restaurantRoutes);

//👇 Error handling and setting status code ==> Client-side and server- side⭐
/* This is important watch video for this in section 20 handling 404 pages*/

app.use(function(request, response, next){

response.status(404).render("404"); //to show the 404 error page if the requested url is not found.
 //👆We are setting status code to 404 manually so that browser does not save cache this
 //page locally and browser knows that for this get request for this url does not get a success.
});


app.use(function(error, request, response, next){
  //This is used to handle the server side errors
  //error is the new parameter here unlike others for handling server-side errors
  response.status(500).render("500");
  //👆We are setting status code to 500 manually so that browser does not save cache this
  //page locally and browser knows that for this get request for this url does not get a success.
});


app.listen(3000);