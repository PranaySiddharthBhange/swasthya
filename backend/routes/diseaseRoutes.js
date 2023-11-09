const express = require("express");
const router = express.Router();
const {
  getDiseases,
  getDisease,
  createDisease,
  updateDisease,
  deleteDisease,
} = require("../controllers/diseaseControllers");
const { protect } = require("../middleware/authMiddleware");
router
  .route("/:patientId")
  .get(protect, getDiseases)
  .post(protect, createDisease);
router
  .route("/:patientId/:diseaseId")
  .get(protect, getDisease)
  .put(protect, updateDisease)
  .delete(protect, deleteDisease);

module.exports = router;
