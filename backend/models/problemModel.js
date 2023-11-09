const mongoose = require("mongoose");
const Medicine = require("./medicineModel");
const Test = require("./testModel");

const problemSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      default: "Not Available",
    },
    sensation: {
      type: String,
      default: "Not Available",
    },
    modality: {
      type: String,
      default: "Not Available",
    },
    concomitant: {
      type: String,
      default: "Not Available",
    },
    duration: {
      type: String,
      default: "Not Available",
    },
    severity: {
      type: String,
      default: "Not Available",
    },
    medications: {
      type: [Medicine.schema],
    },
    tests: {
      type: [Test.schema],
    },
    comment: {
      type: String,
      default: "Not Available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Problem", problemSchema);
//done
