const mongoose = require("mongoose");

const pregnancySchema = new mongoose.Schema(
  {
    status: {
      type: String, // Status of pregnancy (e.g., "Pregnant," "Not Pregnant")
      default: "Not Available",
    },
    gestationalAge: {
      type: String, // Gestational age if pregnant, e.g., "12 weeks"
      default: "Not Available",
    },
    gpaLsd: {
      type: String, // Gravida, Para, Abortion, Last Sexual Date
      default: "Not Available",
    },
    delivery: {
      type: String, // Delivery-related information if applicable
      default: "Not Available",
    },
    birthWeight: {
      type: String, // Birth weight of the child if applicable
      default: "Not Available",
    },
    complications: {
      type: String, // Information about any pregnancy complications
      default: "Not Available",
    },
    babyMilestones: {
      type: String, // Milestones or developmental stages of the child
      default: "Not Available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Pregnancy", pregnancySchema);
//done
