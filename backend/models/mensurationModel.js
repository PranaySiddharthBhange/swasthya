const mongoose = require("mongoose");

const mensurationSchema = new mongoose.Schema(
  {
    regularity: {
      type: String, // Regular or Irregular
      default: "Not Available",
    },
    duration: {
      type: String, // Duration of the menstruation cycle, e.g., "5 days"
      default: "Not Available",
    },
    quantity: {
      type: String, // Flow quantity, e.g., "light," "medium," "heavy"
      default: "Not Available",
    },
    clots: {
      type: String, // Whether clots are present (true/false)
      default: "Not Available",
    },
    stains: {
      type: String, // Whether there are staining issues (true/false)
      default: "Not Available",
    },
    odor: {
      type: String, // Description of any odor associated with menstruation
      default: "Not Available",
    },
    leucorrhoea: {
      type: String, // Information about vaginal discharge, if relevant
      default: "Not Available",
    },
    color: {
      type: String, // Color of menstrual blood
      default: "Not Available",
    },
    lquantity: {
      type: String, //Quantity of leucorrhoea
      default: "Not Available",
    },
    lodor: {
      type: String, //Odor of leucorrhoea
      default: "Not Available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Mensuration", mensurationSchema);
//done
