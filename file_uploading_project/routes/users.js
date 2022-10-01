const { request } = require("express");
const express = require("express");

const multer = require("multer");

const db = require("../data/database");

const storageConfig = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "images");
  },
  filename: function (request, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storageConfig });

const router = express.Router();

router.get("/", async function (req, res) {
  const users = await db.getDb().collection("users").find().toArray();
  res.render("profiles", { users: users });
});

router.get("/new-user", function (req, res) {
  res.render("new-user");
});

router.post("/profiles", upload.single("image"), async function (
  request,
  response
) {
  const uploadedImageFile = request.file;
  const userData = request.body;

  console.log(uploadedImageFile);
  console.log(userData);

  await db.getDb().collection("users").insertOne({
    name: userData.username,
    imagePath: uploadedImageFile.path,
  });

  response.redirect("/");
});

module.exports = router;
