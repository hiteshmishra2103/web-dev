const path = require("path");

const express = require("express");

const session = require("express-session");

const mongodbStore = require("connect-mongodb-session");

const db = require("./data/database");
const demoRoutes = require("./routes/demo");

//code below will return a class👇
const MongodDbStore = mongodbStore(session);

const app = express();

//configuring the storage settings for storing sessions
const sessionStore = new MongodDbStore({
  uri: "mongodb://127.0.0.1:27017",
  databaseName: "auth-demo",
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "superdupersecret",
    //⭐resave:false will influence that a session is only updated in the database
    //if the data in it really changed, if resave will be set to true then a new session
    //will be stored in the database for every incoming request event if nothing
    //about the session data changed for ex: if a same user sends a lot of requests
    //then saving the old session state might not have finished yet and it would then
    //be overwritten by a new empty state
    resave: false,

    //we will set saveUnitialized to false so that a session only stored on the database
    //or wherever we want to store it once we have some data in it.
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 60 * 60 * 24 * 3 * 1000, //(for 3 days)
    },
  })
);

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

  res.locals.isAuth=isAuth;
  res.locals.isAdmin=isAdmin;

  next();
});

app.use(demoRoutes);

app.use(function notFoundMiddleware(req, res) {
  res.render("404");
});

app.use(function (error, req, res, next) {
  res.render("500");
});

db.connectToDatabase().then(function () {
  app.listen(3000);
});
