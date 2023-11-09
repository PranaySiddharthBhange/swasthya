const express = require("express");
const router = express.Router();
const {
  getCasepapers,
  createCasepaper,
  getCasepaper,
  updateCasepaper,
  deleteCasepaper,
} = require("../controllers/casepaperControllers");
const { protect } = require("../middleware/authMiddleware");
router
  .route("/:patientId/:diseaseId")
  .get(protect, getCasepapers)
  .post(protect, createCasepaper);
router
  .route("/:patientId/:diseaseId/:casepaperId")
  .get(protect, getCasepaper)
  .put(protect, updateCasepaper)
  .delete(protect, deleteCasepaper);

module.exports = router;
