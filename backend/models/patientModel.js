const mongoose = require("mongoose");
const Casepaper = require("./casepaperModel");

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },

    physicianName: {
      type: String,
      required: true,
    },

    maritalStatus: {
      type: String,
      default: "Not Available",
    },

    informant: {
      type: String,
      default: "Not Available",
    },

    address: {
      type: String,
      default: "Not Available",
    },

    bloodGroup: {
      type: String,
      default: "Not Available",
    },

    allergies: {
      type: String,
      default: "Not Available",
    },

    disease: [
      {
        disease: {
          type: String,
          require: true,
        },
        casepapers: [Casepaper.schema],
      },
    ],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Patient", patientSchema);
