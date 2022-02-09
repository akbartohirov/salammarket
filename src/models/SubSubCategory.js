const mongoose = require("mongoose");

const SubSubCategorySchema = new mongoose.Schema(
  {
    subSubCategoryName: { type: String, required: true },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SubSubCategory = mongoose.model("SubSubCategory", SubSubCategorySchema);

module.exports = SubSubCategory;
