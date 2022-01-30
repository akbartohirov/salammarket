const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          required: true,
        },
        quantity: { type: String, default: 1 },
      },
    ],
    stir: { type: String },
    entityName: { type: String },
    phone: { type: String },
    city: { type: String, required: true },
    street: { type: String, required: true },
    typeSending: { type: String },
    status: { type: String, default: "pending" },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", CartSchema);

module.exports = Order;
