const express = require("express");
const mongodb = require("mongodb");
const multer = require("multer");

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

const ObjectId = mongodb.ObjectId;

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  try {
    const posts = await db
      .getDb()
      .collection("posts")
      .find({}, { title: 1, summary: 1, "author.name": 1 })
      .toArray();
    res.render("posts-list", { posts: posts });
  } catch (error) {
    next(error);
  }
});

router.get("/new-post", async function (req, res) {
  const authors = await db.getDb().collection("authors").find().toArray();
  res.render("create-post", { authors: authors });
});

router.post("/posts", upload.single("image"), async function (req, res) {
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

router.post("/posts/:id/edit",upload.single("image") ,async function (req, res, next) {
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
  const postId = new ObjectId(req.params.id);
  const result = await db
    .getDb()
    .collection("posts")
    .deleteOne({ _id: postId });
  res.redirect("/posts");
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
