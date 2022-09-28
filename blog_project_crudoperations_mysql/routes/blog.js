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

router.get("/posts/:id", async function(request,response){
    const query=`SELECT posts.*, authors.name AS author_name, authors.email AS author_email FROM posts INNER JOIN authors ON posts.author_id=author.id
    WHERE posts.id=?`;
    const [posts]=await db.query(query, [request.params.id]);
    if(!posts || posts.length===0){
        return response.status(404).render("404");
    }
    const postData={
        ...posts[0],
        date: posts[0].date.toISOString(),
        humanReadableDate:posts[0].date.toLocaleDateString("en-US",{
            weekday:'long',
            year:"numeric",
            month:"long",
            day:"numeric"
        })
    }
response.render("post-detail",{post:postData})
});

router.get("/posts/:id/edit", async function(request,response){
  const query=`
  SELECT * FROM posts WHERE id=?`
  const [posts]=await db.query(query, [request.params.id]);
  if(!posts || posts.length===0){
    return response.status(404).render("404");
  }
  response.render("update-post", {post:posts[0]});

});
router.post("/posts/:id/edit", async function(request,response){
  const query=`
  UPDATE posts SET title=?, summary=?, body=?
  WHERE id=?
  `
  await db.query(query, [request.body.title,
    request.body.summary,
    request.body.content,
    request.params.id
  ]);

  response.redirect("/posts");

});

router.post("/posts/:id/delete",async function(request,response){
  await db.query("DELETE FROM posts WHERE id=?", [request.params.id]);
  response.redirect("/posts");
});

module.exports = router;
