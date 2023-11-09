const asyncHandler = require("express-async-handler");

const Patient = require("../models/patientModel");
const User = require("../models/userModel");
const Casepaper = require("../models/casepaperModel");

// @desc    READ diseases
// @route   GET /api/patients/:patientId/diseases
// @access  Private
const getCasepapers = asyncHandler(async (req, res) => {
  const { patientId, diseaseId } = req.params;

  // Find the patient using the patientId.
  const patient = await Patient.findById(patientId);

  if (!patient) {
    return res.status(404).json({ error: "Patient not found" });
  }

  // Find the disease within the patient using the diseaseId.
  const disease = patient.disease.id(diseaseId);

  if (!disease) {
    return res
      .status(404)
      .json({ error: "Disease not found for this patient" });
  }

  // Retrieve the casepapers array from the disease and return it.
  const casepapers = disease.casepapers;

  return res.status(200).json(casepapers);
});

// @desc    CREATE casepaper
// @route   POST /api/patients/:patientId/diseases
// @access  Private
const createCasepaper = asyncHandler(async (req, res) => {
  const { patientId, diseaseId } = req.params;

  // Find the patient using the patientId.
  const patient = await Patient.findById(patientId);

  if (!patient) {
    return res.status(404).json({ error: "Patient not found" });
  }

  // Find the disease within the patient using the diseaseId.
  const disease = patient.disease.id(diseaseId);

  if (!disease) {
    return res
      .status(404)
      .json({ error: "Disease not found for this patient" });
  }

  // Create a new case paper using the request body.
  const newCasepaper = new Casepaper(req.body);

  console.log("========server inside casepaper controller=================");
  console.log(newCasepaper);

  // Add the new case paper to the disease's casepapers array.
  disease.casepapers.push(newCasepaper);

  // Save the patient to update the casepaper.
  await patient.save();

  return res.status(201).json(newCasepaper);
});

// @desc    UPDATE disease
// @route   PUT /api/patients/:patientId/diseases/:diseaseId
// @access  Private
const updateCasepaper = asyncHandler(async (req, res) => {
  const { patientId, diseaseId, casepaperId } = req.params;

  // Find the patient using the patientId.
  const patient = await Patient.findById(patientId);

  if (!patient) {
    return res.status(404).json({ error: "Patient not found" });
  }

  // Find the disease within the patient using the diseaseId.
  const disease = patient.disease.id(diseaseId);

  if (!disease) {
    return res
      .status(404)
      .json({ error: "Disease not found for this patient" });
  }

  // Find the specific case paper within the disease using the casepaperId.
  const casepaper = disease.casepapers.id(casepaperId);

  if (!casepaper) {
    return res
      .status(404)
      .json({ error: "Case paper not found for this disease" });
  }
  casepaper.set(req.body);

  await patient.save();

  res.status(200).json(casepaper);
});

// @desc    Delete disease
// @route   DELETE /api/patients/:patientId/diseases/:diseaseId
// @access  Private
const deleteCasepaper = asyncHandler(async (req, res) => {
  const { patientId, diseaseId, casepaperId } = req.params;

  // Find the patient using the patientId.
  const patient = await Patient.findById(patientId);

  if (!patient) {
    return res.status(404).json({ error: "Patient not found" });
  }

  // Find the disease within the patient using the diseaseId.
  const disease = patient.disease.id(diseaseId);

  if (!disease) {
    return res
      .status(404)
      .json({ error: "Disease not found for this patient" });
  }

  // Find the specific case paper within the disease using the casepaperId.
  const casepaper = disease.casepapers.id(casepaperId);

  if (!casepaper) {
    return res
      .status(404)
      .json({ error: "Case paper not found for this disease" });
  }

  // Remove the case paper from the disease's casepapers array.
  casepaper.remove();

  // Save the patient to apply the deletion.
  await patient.save();

  res.status(200).json({ message: "Casepaper deleted" });
});

// @desc    READ  disease
// @route   GET /api/patients/:patientId/diseases/:diseaseId
// @access  Private
const getCasepaper = asyncHandler(async (req, res) => {
  const { patientId, diseaseId, casepaperId } = req.params;

  // Find the patient using the patientId.
  const patient = await Patient.findById(patientId);

  if (!patient) {
    return res.status(404).json({ error: "Patient not found" });
  }

  // Find the disease within the patient using the diseaseId.
  const disease = patient.disease.id(diseaseId);

  if (!disease) {
    return res
      .status(404)
      .json({ error: "Disease not found for this patient" });
  }

  // Find the specific case paper within the disease using the casepaperId.
  const casepaper = disease.casepapers.id(casepaperId);

  if (!casepaper) {
    return res
      .status(404)
      .json({ error: "Case paper not found for this disease" });
  }

  return res.status(200).json(casepaper);
});

module.exports = {
  getCasepapers,
  createCasepaper,
  getCasepaper,
  updateCasepaper,
  deleteCasepaper,
};
