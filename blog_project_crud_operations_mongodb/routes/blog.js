const express = require("express");
const mongodb = require("mongodb");
const multer = require("multer");

const bcrypt = require("bcryptjs");

//multer.diskStorage() creates a new storage object as expected by multer
const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + "-" + file.originalname);
  },
});

//configuring the multer package to store the data in images folder
const upload = multer({ storage: storageConfig });

const db = require("../data/database");
const { application } = require("express");
const { restart } = require("nodemon");

const ObjectId = mongodb.ObjectId;

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  const alreadyLoggedIn = req.session.alreadyLoggedIn;
  req.session.alreadyLoggedIn = null;

  try {
    const posts = await db
      .getDb()
      .collection("posts")
      .find({}, { title: 1, summary: 1, "author.name": 1 })
      .toArray();
    res.render("posts-list", {
      posts: posts,
      alreadyLoggedIn: alreadyLoggedIn,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/new-post", async function (req, res) {
  if (!res.locals.isAdmin) {
    return res.status(403).render("403");
  }
  const authors = await db.getDb().collection("authors").find().toArray();
  res.render("create-post", { authors: authors });
});

//signup route

router.get("/signup", function (req, res) {
  if (res.locals.isAuth) {
    req.session.alreadyLoggedIn = {
      message: "You need to logout first to signup as a new user!",
    };
    return res.redirect("/");
  }

  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      message: "",
      email: "",
      confirmEmail: "",
      password: "",
    };
  }

  req.session.inputData = null;

  res.render("signup", { inputData: sessionInputData });
});

//login get route
router.get("/login", async function (req, res, next) {
  if (res.locals.isAuth) {
    req.session.alreadyLoggedIn = {
      message: "You need to logout first to login as a new user!",
    };
    return res.redirect("/");
  }

  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      message: "",
      email: "",
      password: "",
    };
  }

  req.session.inputData = null;
  res.render("login", { inputData: sessionInputData });
});

// rendering analytics page

router.get("/analytics", async function (req, res, next) {
  if (!res.locals.isAuth) {
    return res.status(401).render("401");
  }

  const user = await db
    .getDb()
    .collection("users")
    .findOne({ _id: req.session.user.id });

  if (!user.isAdmin || !user) {
    return res.status(403).render("403");
  }
  res.render("admin/analytics");
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

  const hashedPassword = await bcrypt.hash(enteredPassword, 16);

  const user = {
    email: enteredEmail,
    password: hashedPassword,
  };

  await db.getDb().collection("users").insertOne(user);
  res.redirect("/login");
});

router.post("/login", async function (req, res, next) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredPassword = userData.password;

  if (!enteredEmail || !enteredEmail.includes("@")) {
    req.session.inputData = {
      hasError: true,
      message: "Invalid credentials!",
      email: enteredEmail,
      password: enteredPassword,
    };

    req.session.save(function () {
      res.redirect("/login");
    });
    return;
  }

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: enteredEmail });

  if (!existingUser) {
    req.session.inputData = {
      hasError: true,
      message: "User does not exist!",
      email: enteredEmail,
      password: enteredPassword,
    };

    req.session.save(function () {
      res.redirect("/login");
    });
    return;
  }

  const passwordValidation = await bcrypt.compare(
    enteredPassword,
    existingUser.password
  );

  if (!passwordValidation) {
    req.session.inputData = {
      hasError: true,
      message: "Invalid credentials!",
      email: enteredEmail,
      password: enteredPassword,
    };

    req.session.save(function () {
      res.redirect("/login");
    });
    return;
  }

  req.session.user = {
    id: existingUser._id,
    email: existingUser.email,
  };

  req.session.isAuthenticated = true;

  req.session.save(function () {
    res.redirect("/");
  });
});

router.post("/posts", upload.single("image"), async function (req, res) {
  if (!res.locals.isAdmin) {
    return res.status(403).render("403");
  }

  let authorId;
  let author;

  try {
    authorId = new ObjectId(req.body.author);
    author = await db.getDb().collection("authors").findOne({ _id: authorId });
  } catch {
    return res.status(404).render("404");
  }

  //req.file will give you image path and it will be stored in uploadedImageFile
  const uploadedImageFile = req.file;

  const newPost = {
    title: req.body.title,
    imagePath: uploadedImageFile.path,
    summary: req.body.summary,
    body: req.body.content,
    date: new Date(),
    author: {
      id: authorId,
      name: author.name,
      email: author.email,
    },
  };

  const result = await db.getDb().collection("posts").insertOne(newPost);
  res.redirect("/posts");
});

router.get("/posts/:id", async function (req, res) {
  let postId = req.params.id;
  let post;

  //added error handling if the posts with postId not found then it will show the
  //404 page else it will show post details page.

  try {
    postId = new ObjectId(postId);
    post = await db
      .getDb()
      .collection("posts")
      .findOne({ _id: new ObjectId(postId) }, { summary: 0 });
  } catch {
    return res.status(404).render("404");
  }

  // if (!post) {
  //   return res.status(404).render("404");
  // }

  post.humanReadableDate = post.date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  post.date = post.date.toISOString();

  res.render("post-detail", { post: post, comments: null });
});

router.get("/posts/:id/edit", async function (req, res) {
  if (!res.locals.isAdmin) {
    console.log("You are not authorized!");
    return res.status(403).render("403");
  }

  let postId = req.params.id;
  let post;

  try {
    postId = new ObjectId(postId);
    post = await db
      .getDb()
      .collection("posts")
      .findOne(
        { _id: new ObjectId(postId) },
        { title: 1, summary: 1, body: 1, imagePath: 1 }
      );
  } catch {
    return res.status(404).render("404");
  }
  res.render("update-post", { post: post });
});

router.post("/posts/:id/edit", upload.single("image"), async function (
  req,
  res,
  next
) {
  if (!res.locals.isAdmin) {
    console.log("You are not authorized!");
    return res.status(403).render("403");
  }

  const postId = new ObjectId(req.params.id);

  const uploadedImageFile = req.file;

  try {
    await db.getDb().collection("posts").findOne({ _id: postId });
    const result = await db
      .getDb()
      .collection("posts")
      .updateOne(
        { _id: postId },
        {
          $set: {
            title: req.body.title,
            imagePath: uploadedImageFile.path,
            summary: req.body.summary,
            body: req.body.content,
            //date: new Date()
          },
        }
      );
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/posts");
});

router.post("/posts/:id/delete", async function (req, res) {

  
  if (!res.locals.isAdmin) {
    console.log("You are not authorized!")
    return res.status(403).render("403");
  }

  const postId = new ObjectId(req.params.id);
  const result = await db
    .getDb()
    .collection("posts")
    .deleteOne({ _id: postId });
  res.redirect("/posts");
});

router.post("/logout", async function (req, res) {
  if (req.session.user) {
    userId = req.session.user.id;
    req.session.destroy(function () {
      res.redirect("/");
    });
    return;
  }
  res.redirect("/");
});

router.get("/posts/:id/comments", async function (req, res) {
  const postId = new ObjectId(req.params.id);
  const comments = await db
    .getDb()
    .collection("comments")
    .find({ postId: postId })
    .toArray();

  //here the server will return the data in JSON format to the browser
  res.json(comments);
});

router.post("/posts/:id/comments", async function (req, res) {
  const postId = new ObjectId(req.params.id);
  const newComment = {
    postId: postId,
    title: req.body.title,
    text: req.body.text,
  };
  await db.getDb().collection("comments").insertOne(newComment);
  res.json({ message: "Comment added" });
});

module.exports = router;
