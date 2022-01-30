const express = require("express");
const { auth, admin } = require("../middleware/auth");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const router = new express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/svg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
  fileFilter: fileFilter,
});

router.post("/", upload.array("img", 10), async (req, res) => {
  // const images = req.files.map((item) => {
  //   return { filename: item.filename, path: item.path };
  // });

  const productForm = {
    title: req.body.title,
    description: req.body.description,
    img: "images",
    category: req.body.category,
    color: req.body.color,
    boughtPrice: req.body.boughtPrice,
    sellPrice: req.body.sellPrice,
    amount: req.body.amount,
  };

  try {
    const newProduct = new Product(productForm);

    const product = await newProduct.save();

    res.status(201).send(product);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const toUpdate = req.body;
  try {
    const updateProduct = await Product.findByIdAndUpdate(id, toUpdate, {
      new: true,
      runValidators: true,
    });

    res.status(201).send(updateProduct);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const toDelete = req.body;
  try {
    await Product.findByIdAndDelete(id);

    res.status(201).send("Product has been deleted");
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const qNew = req.query.new;
    const qCategory = req.query.category;

    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(10);
    } else if (qCategory) {
      products = await Product.find({ categories: { $in: [qCategory] } });
    } else {
      products = await Product.find();
    }

    res.status(200).send(products);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);

    res.status(200).send(product);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.post("/cart", async (req, res) => {
  const ids = req.body.products;

  const formatted = ids.map((id) => mongoose.Types.ObjectId(id));

  try {
    const products = await Product.find({
      _id: { $in: formatted },
    });
    if (products) {
      res.status(200).send(products);
    } else {
      res.status(404).send({ error: "not found" });
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.post("/search", async (req, res) => {
  const { q } = req.query;

  try {
    const products = await Product.find();

    const search = products.filter((product) => {
      const filtered = product.title.toLowerCase().includes(q);
      return filtered;
    });

    if (search.length > 0) {
      res.status(200).send(search);
    } else {
      res.status(404).send({
        error: "not found",
      });
    }
  } catch (e) {
    res.status(500).send({
      error: e.message,
    });
  }
});

module.exports = router;
