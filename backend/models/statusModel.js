const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema(
  {
    hunger: {
      type: String,
      default: "Not Available",
    },

    cravings: {
      type: String,
      default: "Not Available",
    },

    perspiration: {
      type: String,
      default: "Not Available",
    },

    appetite: {
      type: String,
      default: "Not Available",
    },

    thirst: {
      type: String,
      default: "Not Available",
    },

    urin: {
      type: String,
      default: "Not Available",
    },

    stool: {
      type: String,
      default: "Not Available",
    },

    sleep: {
      type: String,
      default: "Not Available",
    },
    fatigue: {
      type: String,
      default: "Not Available",
    },
    heartRate: {
      type: String,
      default: "Not Available",
    },
    bloodPressure: {
      type: String,
      default: "Not Available",
    },
    temperature: {
      type: String,
      default: "Not Available",
    },
    smoking: {
      type: String,
      default: "Not Available",
    },
    alcohol: {
      type: String,
      default: "Not Available",
    },
    recentSurgeries: {
      type: String,
      default: "Not Available",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Status", statusSchema);

//done
