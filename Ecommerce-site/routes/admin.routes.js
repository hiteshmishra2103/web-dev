const express = require("express");

const router = express.Router();

//Importing custom admin related middleware functions to handle admin related requests
const adminController = require("../controllers/admin.controller");
const imageUploadMiddleware = require("../middlewares/image-upload");
const { authRoutes } = require("./auth.routes");

router.get("/products", adminController.getProducts); //This will send request to /admin/products
router.get("/products/new-product", adminController.getNewProduct); //This will send request to /admin/products/new-products

router.post(
  "/products",
  imageUploadMiddleware,
  adminController.createNewProduct
);

router.get("/products/:id", adminController.getUpdateProduct);

router.post(
  "/products/:id",
  imageUploadMiddleware,
  adminController.updateProduct
);
module.exports = router;

router.delete("/products/:id", adminController.deleteProduct);

router.get("/orders", adminController.getOrders);

//route for updating the order status

router.patch("/orders/:id", adminController.updateOrder);
