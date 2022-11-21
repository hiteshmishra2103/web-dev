const path = require("path");

const express = require("express");

//importing the csurf package for adding the csrf protection to the site
const csrf = require("csurf");

//setting environment variables for deployement to render 

let port=3000;

if(process.env.PORT){
  port=process.env.PORT;
}

const expressSession = require("express-session");

const createSessionConfig = require("./config/session");

//importing the database.js file.There is the code for connecting to the database
// and checking if that database is connected.👇
const db = require("./data/database");

const addCSRFTokenMiddleware = require("./middlewares/csrf-token");

const errorHandlerMiddleware = require("./middlewares/error-handler");

const checkAuthStatusMiddleware = require("./middlewares/check-auth");

const protectRoutesMiddleware = require("./middlewares/protect-routes");

const cartMiddleware = require("./middlewares/cart");

const updateCartPricesMiddleware = require("./middlewares/update-cart-prices");

const notFoundMiddleware=require("./middlewares/not-found");

const authRoutes = require("./routes/auth.routes"); //importing custom authRoutes package
const productsRoutes = require("./routes/products.routes");

const cartRoutes = require("./routes/cart.routes");

const baseRoutes = require("./routes/base.routes");
const adminRoutes = require("./routes/admin.routes");

const ordersRoutes = require("./routes/orders.routes");

const app = express();

//Code for setting ejs template engine

app.set("view engine", "ejs");

//telling the express the path of ejs files, in this case files are under views folder👇
app.set("views", path.join(__dirname, "views"));

//code for serving static files(static files are javascript and css files which should be accessible whenever client requests them)
// for ex:- when we will serve html file, then that html file will also require some js and css files which can't be provided by get or post request
//then they will be provided by this code.👇
app.use(express.static("public"));
app.use("/products/assets", express.static("product-data"));

//express.urlencoded() is a middleware function that will look at all the incoming requests and will look
//for form data and if it founds form data, it will parse the form data and convert it into javascript object
//so that it can be used in our code.⭐
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csrf());

//activating cart middleware after adding csrf token middleware
app.use(cartMiddleware);
app.use(updateCartPricesMiddleware);

app.use(addCSRFTokenMiddleware);

app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);

//adding cart routes
app.use("/cart", cartRoutes);

//middleware to check whether the user is authenticated or authenticated as well as authorised for viewing the certain resources of site
app.use("/orders", protectRoutesMiddleware,ordersRoutes);

app.use("/admin", protectRoutesMiddleware,adminRoutes); //adding "/admin" means that this route will only
//become accessible if request starts from "/admin"

app.use(notFoundMiddleware);  

app.use(errorHandlerMiddleware);

// code for connecting to the database and checking if the database is connected then
// listen to the port no. 3000 otherwise throw an error.
db.connectToDatabase()
  .then(function () {
    app.listen(port);
  })
  .catch(function (error) {
    console.log("Failed to connect to the database!");
    console.log(error);
  });
