const path = require("path");

const express = require("express");

const session = require("express-session");

const mongodbStore = require("connect-mongodb-session");

const csrf=require("csurf");

const blogRoutes = require("./routes/blog");
const db = require("./data/database");

const MongoDbStore = mongodbStore(session);

const app = express();

let mongodbUrl = "mongodb://127.0.0.1:27017";

if (process.env.MONGODB_URI) {
  mongodbUrl = process.env.MONGODB_URI;
}

const sessionStore = new MongoDbStore({
  uri: mongodbUrl,
  databaseName: "blog",
  collection: "sessions",
});



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

app.use(
  session({
    secret: "superdupersecret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 3 * 24 * 60 * 60 * 1000, //cookie age is set to 3 days
      sameSite: "lax",
    },
  })
);

//CSRF package uses sessions, that's why I will activate it after the activating the session

app.use(csrf());

//adding custom csrf token middleware so that we don't have to pass csrf token
//to every file manually
app.use(function (req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
});

//middleware to provide isAdmin and isAuth values to all templates
app.use(async function (req, res, next) {
  const user = req.session.user;
  const isAuth = req.session.isAuthenticated;

  if (!user || !isAuth) {
    return next();
  }
  const userDoc = await db
    .getDb()
    .collection("users")
    .findOne({ _id: user.id });

  const isAdmin = userDoc.isAdmin;

  res.locals.isAuth = isAuth;
  res.locals.isAdmin = isAdmin;

  next();
});


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
