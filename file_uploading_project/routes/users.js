const express = require("express");

const multer = require("multer");

const db = require("../data/database");

const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    //Date.now() will return the current date in milliseconds with respect to the
    //1 jan 1970, we are doing this to avoid storing same file names to the server
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storageConfig });

const router = express.Router();

router.get("/", async function (req, res) {
  try{
    const users=await db.getDb().collection("users").find().toArray();
  res.render("profiles", {users:users});
  }catch(error){
    alert("Failed to load profiles!");
  }
  
});

router.get("/new-user", function (req, res) {
  res.render("new-user");
});

router.post("/profiles", upload.single("image"),async function (req, res) {
  //uploadedImageFile contains the file data which is uploaded
  const uploadedImageFile = req.file;
  const userData = req.body;

  await db.getDb().collection("users").insertOne({
    name: userData.username,
    imagePath: uploadedImageFile.path,
  });

  res.redirect("/");
});

module.exports = router;
