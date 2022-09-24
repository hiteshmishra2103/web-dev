const express = require("express");

const db = require("../data/database");

const router = express.Router();

router.get("/", function (request, response) {
  response.redirect("/posts");
});

router.get("/posts", async function (request, response) {

  const [posts] = await db.query("SELECT posts.*, authors.name AS author_name FROM posts INNER JOIN authors ON posts.author_id=authors.id");
  response.render("posts-list", { posts:posts });
});

router.get("/new-post", async function (request, response) {
  const [authors] = await db.query("SELECT * FROM authors");
  response.render("create-post", { authors: authors });
});

router.post("/posts", async function (request, response) {
  const data = [request.body.title, request.body.summary, request.body.content, request.body.author];

  await db.query("INSERT INTO posts (title, summary, body, author_id) VALUES (?)", [
    data,
  ]);
  response.redirect("/posts");
});

module.exports = router;
