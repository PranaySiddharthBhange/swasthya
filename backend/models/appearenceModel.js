const mongoose = require("mongoose");

const appearenceSchema = new mongoose.Schema(
  {
    height: {
      type: String,
      default: "Not Available",
    },
    weight: {
      type: String,
      default: "Not Available",
    },
    disability: {
      type: String,
      default: "Not Available",
    },
    birthMark: {
      type: String,
      default: "Not Available",
    },
    expresion: {
      type: String,
      default: "Not Available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Appearence", appearenceSchema);
