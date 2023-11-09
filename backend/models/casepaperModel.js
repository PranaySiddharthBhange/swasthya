const mongoose = require("mongoose");
const Problem = require("./problemModel");
const Mensuration = require("./mensurationModel");
const Status = require("./statusModel");
const Appearence = require("./appearenceModel");
const Pregnancy = require("./pregnencyModel");

const casepaperSchema = new mongoose.Schema(
  {
    problems: {
      type: [Problem.schema],
      default: [],
    },

    status: {
      type: Status.schema,
      default: {},
    },

    appearence: {
      type: Appearence.schema,
      default: {},
    },

    mensuration: {
      type: Mensuration.schema,
      default: {},
    },

    pregnancy: {
      type: Pregnancy.schema,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Casepaper", casepaperSchema);
//done
