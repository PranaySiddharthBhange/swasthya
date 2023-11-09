const asyncHandler = require("express-async-handler");

const Patient = require("../models/patientModel");
const User = require("../models/userModel");

// @desc    READ patients
// @route   GET /api/patients
// @access  Private
const getPatients = asyncHandler(async (req, res) => {
  const patients = await Patient.find({ user: req.user.id });

  res.status(200).json(patients);
});

// @desc    CREATE patient
// @route   POST /api/patients
// @access  Private
const createPatient = asyncHandler(async (req, res) => {
  console.log("Inside Create Patient");
  const {
    name,
    age,
    gender,
    physicianName,
    maritalStatus,
    informant,
    address,
    bloodGroup,
    allergies,
    disease,
  } = req.body;

  if (!name || !age || !gender || !physicianName) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const patient = await Patient.create({
    name,
    age,
    gender,
    physicianName,
    maritalStatus: maritalStatus || "Not Available",
    informant: informant || "Not Available",
    address: address || "Not Available",
    bloodGroup: bloodGroup || "Not Available",
    allergies: allergies || "Not Available",
    disease: disease || [],
    user: req.user.id,
  });

  res.status(201).json(patient);
});

// @desc    UPDATE patient
// @route   PUT /api/patients/:id
// @access  Private
const updatePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    res.status(400);
    throw new Error("Patient not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the patient user
  if (patient.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const {
    name,
    age,
    gender,
    physicianName,
    maritalStatus,
    informant,
    address,
    bloodGroup,
    allergies,
    // disease,
  } = req.body;

  if (!name || !age || !gender || !physicianName) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  patient.name = name;
  patient.age = age;
  patient.gender = gender;
  patient.physicianName = physicianName;
  patient.maritalStatus = maritalStatus || "Not Available";
  patient.informant = informant || "Not Available";
  patient.address = address || "Not Available";
  patient.bloodGroup = bloodGroup || "Not Available";
  patient.allergies = allergies || "Not Available";
  // patient.disease = disease || [];

  const updatedPatient = await patient.save();

  res.status(200).json(updatedPatient);
});

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deletePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    res.status(400);
    throw new Error("Patient not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged-in user matches the patient user
  if (patient.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await patient.remove();

  res.status(200).json({ id: req.params.id });
});

// @desc    READ patient
// @route   GET /api/goals/:id
// @access  Private
const getPatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }

  // Check if the user is authorized to access this patient's data
  if (patient.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  res.status(200).json(patient);
});

module.exports = {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
};
