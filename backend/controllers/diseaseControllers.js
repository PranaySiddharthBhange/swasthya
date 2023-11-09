const asyncHandler = require("express-async-handler");

const Patient = require("../models/patientModel");
const User = require("../models/userModel");

// @desc    READ diseases
// @route   GET /api/patients/:patientId/diseases
// @access  Private
const getDiseases = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.patientId);
  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }

  res.status(200).json(patient.disease);
});

// @desc    CREATE disease
// @route   POST /api/patients/:patientId/diseases
// @access  Private
const createDisease = asyncHandler(async (req, res) => {
  console.log("Inside createDisease ======>>>>");
  console.log("Printing Params ======>>>>");

  console.log(req.params);
  const patient = await Patient.findById(req.params.patientId);
  console.log("Printing ids ======>>>>");

  console.log(patient);

  if (!patient) {
    res.status(404);
    throw new Error(`Patient Not Found ${patient}`);
  }

  const { disease } = req.body;

  const newDisease = {
    disease,
    casepapers: [],
  };

  patient.disease.push(newDisease);
  await patient.save();

  res.status(201).json(newDisease);
});

// @desc    UPDATE disease
// @route   PUT /api/patients/:patientId/diseases/:diseaseId
// @access  Private
const updateDisease = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.patientId);
  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }

  const disease = patient.disease.id(req.params.diseaseId);
  if (!disease) {
    res.status(404);
    throw new Error("Disease not found");
  }

  disease.disease = req.body.disease;

  await patient.save();

  res.status(200).json(disease);
});

// @desc    Delete disease
// @route   DELETE /api/patients/:patientId/diseases/:diseaseId
// @access  Private
const deleteDisease = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.patientId);
  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }

  const disease = patient.disease.id(req.params.diseaseId);
  if (!disease) {
    res.status(404);
    throw new Error("Disease not found");
  }

  disease.remove();
  await patient.save();

  res.status(200).json({ message: "Disease deleted" });
});

// @desc    READ  disease
// @route   GET /api/patients/:patientId/diseases/:diseaseId
// @access  Private
const getDisease = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.patientId);
  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }

  const disease = patient.disease.id(req.params.diseaseId);
  if (!disease) {
    res.status(404);
    throw new Error("Disease not found");
  }

  res.status(200).json(disease);
});

module.exports = {
  getDiseases,
  getDisease,
  createDisease,
  updateDisease,
  deleteDisease,
};
