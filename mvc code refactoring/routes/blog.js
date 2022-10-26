const express = require("express");
const blogControllers=require("../controllers/post-controllers");

const Post = require("../model/post");

const router = express.Router();

router.get("/", blogControllers.getHome);

router.get("/admin", blogControllers.getAdmin);

router.post("/posts", blogControllers.createPost);

router.get("/posts/:id/edit", blogControllers.getSinglePost);

router.post("/posts/:id/edit", async function (req, res) {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;
  const postId = new ObjectId(req.params.id);

  if (
    !enteredTitle ||
    !enteredContent ||
    enteredTitle.trim() === "" ||
    enteredContent.trim() === ""
  ) {
    req.session.inputData = {
      hasError: true,
      message: "Invalid input - please check your data.",
      title: enteredTitle,
      content: enteredContent,
    };

    const post = new Post(enteredTitle, enteredContent, req.params.id);
    await post.save();

    res.redirect(`/posts/${req.params.id}/edit`);
    return;
  } 

  await db
    .getDb()
    .collection("posts")
    .updateOne(
      { _id: postId },
      { $set: { title: enteredTitle, content: enteredContent } }
    );

  res.redirect("/admin");
});

router.post("/posts/:id/delete", async function (req, res) {
  const post= new Post(null, null, req.params.id);
  await post.delete();
  res.redirect("/admin");
});

module.exports = router;
