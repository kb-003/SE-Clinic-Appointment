const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Use getAllAppointments for React frontend
router.post('/', appointmentController.createAppointment);
router.get('/', appointmentController.getAllAppointments);
router.get('/:id', appointmentController.getAppointment);
router.put('/:id', appointmentController.updateAppointment);
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;