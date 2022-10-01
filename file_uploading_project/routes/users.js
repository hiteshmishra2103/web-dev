const { request } = require("express");
const express = require("express");

const multer = require("multer");

const storageConfig=multer.diskStorage({
  destination:function(request,file, callback){
    callback(null, "images");
  },
  filename:function(request,file,callback){
    callback(null, Date.now() + "-" + file.originalname)
  }
})

const upload = multer({ storage: storageConfig});

const router = express.Router();

router.get("/", function (req, res) {
  res.render("profiles");
});

router.get("/new-user", function (req, res) {
  res.render("new-user");
});

router.post("/profiles", upload.single("image"), function (request, response) {
  const uploadedImageFile = request.file;
  const userData = request.body;

  console.log(uploadedImageFile);
  console.log(userData);

  response.redirect("/");
});

module.exports = router;
