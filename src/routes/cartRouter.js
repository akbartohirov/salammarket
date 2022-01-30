const express = require("express");
const { auth, admin, userAndAdmin } = require("../middleware/auth");
const Cart = require("../models/Cart");
const router = new express.Router();

//create cart
router.post("/", auth, async (req, res) => {
  try {
    const newCart = new Cart(req.body);

    const saveCart = await newCart.save();
    res.status(201).send(saveCart);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

//change cart
router.patch("/:id", auth, async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).send(updateCart);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    await Cart.findByIdAndDelete(id);
    res.status(200).send("The cart has been deleted");
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get("/:userId", auth, async (req, res) => {
  const id = req.params.userId;
  try {
    const cart = await Cart.findOne({ userId: id });

    if (!cart) {
      throw new Error("Not found");
    }

    res.status(200).send(cart);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const carts = await Cart.find();

    if (!carts) {
      throw new Error("Not found");
    }

    if (!carts) res.status(200).send(carts);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = router;
