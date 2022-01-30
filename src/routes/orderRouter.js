const express = require("express");
const { auth, admin, userAndAdmin } = require("../middleware/auth");
const Order = require("../models/Order");

const router = new express.Router();

//create order
router.post("/", auth, async (req, res) => {
  try {
    const newOrder = new Order(req.body);

    const saveOrder = await newOrder.save();
    res.status(201).send(saveOrder);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

//change cart
router.patch("/:id", auth, async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).send(updateOrder);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    await Order.findByIdAndDelete(id);
    res.status(200).send("The order has been deleted");
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get("/:userId", auth, async (req, res) => {
  const id = req.params.userId;
  try {
    const orders = await Order.find({ userId: id });

    if (!orders) {
      throw new Error("Not found");
    }

    res.status(200).send(orders);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find();

    if (!orders) {
      throw new Error("Not found");
    }

    res.status(200).send(carts);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get("/income", async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(date.setMonth(date.getMonth() - 2));

  try {
    console.log(date, lastMonth, previousMonth);
    res.status(200).send("hello");
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = router;
