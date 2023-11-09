import axios from "axios";

const API_URL = "/api/patients/";

// Create new patient
const createPatient = async (patientData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, patientData, config);

  return response.data;
};

// Get all patients
const getPatients = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get a single patient
const getPatient = async (patientId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + patientId, config);

  return response.data;
};

// Update a single patient
const updatePatient = async (patientId, patientData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + patientId, patientData, config);

  return response.data;
};

// Delete a single patient
const deletePatient = async (patientId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + patientId, config);

  return response.data;
};

// Delete all patients
const deleteAllPatients = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL, config);

  return response.data;
};

const patientService = {
  createPatient,
  getPatients,
  getPatient,
  updatePatient,
  deletePatient,
  deleteAllPatients,
};

export default patientService;
