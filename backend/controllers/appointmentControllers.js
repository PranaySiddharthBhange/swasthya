const asyncHandler = require("express-async-handler");
const Appointment = require("../models/appointmentModel");


//done
// @desc    Get all appointments
// @route   GET /api/appointment
// @access  Private
const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({});
  res.json(appointments);
});


//done
// @desc    Create a new appointment
// @route   POST /api/appointment
// @access  Public
const createAppointment = asyncHandler(async (req, res) => {
  const { name,date,contact,status } = req.body;


  const appointment = await Appointment.create({
    name,
    date,
    contact,
    status,
  });
  res.status(201).json(appointment);
});


//done
// @desc    Get a single appointment by ID
// @route   GET /api/appointment/:appointmentId
// @access  Private
const getAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.appointmentId);
  if (!appointment) {
    res.status(404);
    throw new Error("Appointment not found");
  }
  res.json(appointment);
});

//done
// @desc    Delete an appointment
// @route   DELETE /api/appointment/:appointmentId
// @access  Private
const deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findByIdAndDelete(
    req.params.appointmentId
  );
  if (!appointment) {
    res.status(404);
    throw new Error("Appointment not found");
  }
  res.json({ message: "Appointment deleted" });
});

//done
// @desc    Update the status of an appointment
// @route   PUT /api/appointment/:appointmentId/status
// @access  Private
const updateAppointmentStatus = asyncHandler(async (req, res) => {
  let appointment = await Appointment.findById(req.params.appointmentId);
  if (!appointment) {
    res.status(404);
    throw new Error("Appointment not found");
  }

  // Determine new status
  let newStatus = appointment.status === "waiting" ? "done" : "waiting";

  // Update appointment status
  appointment.status = newStatus;
  await appointment.save();

  res.json(appointment);
});

module.exports = {
  getAppointments,
  createAppointment,
  getAppointment,
  deleteAppointment,
  updateAppointmentStatus
};
