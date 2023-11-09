const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicineSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "No description available",
    },

    dosage: {
      type: String,
      default: "Not specified",
    },
    quantity: {
      type: String,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Medicine", medicineSchema);
//done
