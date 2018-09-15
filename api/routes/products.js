const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const checkauth = require('../middleware/check-auth');
const ProductController = require('../controllers/products')

const Product = require("../models/product");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});



router.get("/", ProductController.products_get_all);

router.post("/", checkauth, upload.single('productImage'), ProductController.products_create_product);

router.get("/:productId", ProductController.products_get_product );

router.patch("/:productId", ProductController.products_update_product);

router.delete("/:productId", checkauth, ProductController.products_delete_product );

module.exports = router;
