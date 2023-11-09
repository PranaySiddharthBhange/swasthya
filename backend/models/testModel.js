const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Not Available",
    },
    result: {
      type: String,
      default: "Not Available",
    },
    data: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Test", testSchema);

//done
