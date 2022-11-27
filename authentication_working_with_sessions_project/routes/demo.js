const express = require("express");
const bcrypt = require("bcryptjs");

const db = require("../data/database");

//session id is attached to request of every route
const session = require("express-session");
const { localsName } = require("ejs");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("welcome");
});

router.get("/signup", function (req, res) {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: "",
      confirmEmail: "",
      password: "",
    };
  }
  req.session.inputData = null;
  res.render("signup", { inputData: sessionInputData });
});

router.get("/login", function (req, res) {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: "",
      password: "",
    };
  }
  req.session.inputData = null;
  res.render("login",{inputData:sessionInputData});
});

router.post("/signup", async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredConfirmEmail = userData["confirm-email"];
  const enteredPassword = userData.password;

  if (
    !enteredEmail ||
    !enteredConfirmEmail ||
    enteredPassword.trim().length < 8 ||
    enteredEmail !== enteredConfirmEmail ||
    !enteredEmail.includes("@")
  ) {
    req.session.inputData = {
      hasError: true,
      message: "Invalid input - please check your data.",
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
    };

    req.session.save(function () {
      res.redirect("/signup");
    });
    return;
  }

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: enteredEmail });

  if (existingUser) {
    req.session.inputData = {
      hasError: true,
      message: "User exists already, try login! ",
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
    };

    req.session.save(function () {
      res.redirect("/signup");
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(enteredPassword, 16);

  const user = {
    email: enteredEmail,
    password: hashedPassword,
  };

  await db.getDb().collection("users").insertOne(user);
  res.redirect("/login");
});

router.post("/login", async function (req, res) {
  const userData = req.body;
  const enteredEmail = req.body.email;
  const enteredPassword = req.body.password;

  //find the user with provided email, if we don't find the user with that email
  //in database then it will return null or undefined, if will not return an error

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: enteredEmail });

  //if user with entered email does not exist then
  if (!existingUser) {
    req.session.inputData = {
      hasError: true,
      message: "Could not login! please check your credentials.",
      email: enteredEmail,
      password: enteredPassword,
    };
    return res.redirect("login");
  }

  //to check if the entered password is correct by using bcrypt.compare
  //it will true if the password is correct else false
  const passwordsAreEqual = await bcrypt.compare(
    enteredPassword,
    existingUser.password
  );

  if (!passwordsAreEqual) {
    req.session.inputData = {
      hasError: true,
      message: "Could not login! please check your credentials.",
      email: enteredEmail,
      password: enteredPassword,
    };

    req.session.save(function () {
     res.redirect("/login");
    });
    return;
  }

  //Below code will store data in session and also in database collection "sessions"
  req.session.user = {
    id: existingUser._id,
    email: existingUser.email,
  };

  req.session.isAuthenticated = true;

  req.session.save(function () {
    //it is a callback function which will only evoke
    //when the session data will be save to database
    res.redirect("/admin");
  });
});

router.get("/admin", async function (req, res) {
  //checking the user ticket
  if (!res.locals.isAuth) {
    //or you can use this condition (req.session.user)
    return res.status(401).render("401");
  }


  if (!res.locals.isAdmin) {
    return res.status(403).render("403");
  }

  res.render("admin");
});

 
router.get("/profile", function (req, res) {
  //checking the user ticket
  if (!res.locals.isAuth) {
    //or you can use this condition (req.session.user)
    return res.status(401).render("401");
  }

  res.render("profile");
});

router.post("/logout", function (req, res) {
  //deleting user session
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect("/");
});

module.exports = router;
