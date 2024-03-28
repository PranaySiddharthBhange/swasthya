const express = require("express");
const router = express.Router();
const {
  getAppointments,
  createAppointment,
  getAppointment,
  deleteAppointment,
  updateAppointmentStatus
 
} = require("../controllers/appointmentControllers");
const { protect } = require("../middleware/authMiddleware");
router
  .route("/")
  // .get(protect,getAppointments) 
  .get(getAppointments)
  .post(createAppointment);
router
  .route("/:appointmentId")
  // .get(protect, getAppointment) 
  .get(getAppointment)
  .delete(deleteAppointment)
  .put(updateAppointmentStatus)
  // .delete(protect, deleteAppointment);

module.exports = router;
