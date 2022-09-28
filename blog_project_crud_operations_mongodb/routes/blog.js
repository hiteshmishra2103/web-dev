const { request, response } = require("express");
const express = require("express");

const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;

const router = express.Router();

const db = require("../data/database");

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.post("/posts", async function (request, response) {
  const authorId = new ObjectId(request.body.author);
  const author = await db
    .getDb()
    .collection("authors")
    .findOne({ _id: authorId });
  const newPost = {
    title: request.body.title,
    summary: request.body.summary,
    body: request.body.content,
    date: new Date(),
    author: {
      id: new ObjectId(request.body.author),
      name: author.name,
      email: author.email,
    },
  };
  const result = await db.getDb().collection("posts").insertOne(newPost);
  console.log(result);
  response.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  const posts = await db
    .getDb()
    .collection("posts")
    .find({}, { title: 1, summary: 1, "author.name": 1 })
    .toArray();
  res.render("posts-list", { posts: posts });
});

router.get("/new-post", async function (req, res) {
  const authors = await db.getDb().collection("authors").find().toArray();
  res.render("create-post", { authors: authors });
});

router.get("/posts/:id", async function (request, response, next) {
  let postId = request.params.id;
  try {
    postId = new ObjectId(postId);
  } catch (error) {
    return response.status(404).render("404");
    // return next(error);
  }
  const post = await db
    .getDb()
    .collection("posts")
    .findOne({ _id: new ObjectId(postId) }, { summary: 0 });
  if (!post) {
    return response.status(404).render("404");
  }
  post.humanReadableDate = post.date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  post.date = post.date.toISOString();
  response.render("post-detail", { post: post });
});

router.get("/posts/:id/edit", async function (request, response) {
  const postId = request.params.id;
  const post = await db
    .getDb()
    .collection("posts")
    .findOne({ _id: new ObjectId(postId) }, { title: 1, summary: 1, body: 1 });
  if (!post) {
    return response.status(404).render("404");
  }
  response.render("update-post", { post: post });
});

router.post("/posts/:id/edit", async function (request, response) {
  const postId = new ObjectId(request.params.id);
  const result = await db
    .getDb()
    .collection("posts")
    .updateOne(
      { _id: postId },
      {
        $set: {
          title: request.body.title,
          summary: request.body.summary,
          body: request.body.content,
        },
      }
    );
  response.redirect("/posts");
});

router.post("/posts/:id/delete", async function (request, response) {
  const postId = new ObjectId(request.params.id);

  const result = await db
    .getDb()
    .collection("posts")
    .deleteOne({ _id: postId });

  response.redirect("/posts");
});

module.exports = router;
