const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  startAt: { type: Date, required: true },
  endAt: { type: Date, required: true },
  notes: { type: String }
}, { timestamps: true });


appointmentSchema.pre('validate', function(next) {
  if (this.endAt <= this.startAt) {
    return next(new Error('endAt must be after startAt'));
  }
  next();
});

module.exports = mongoose.model('Appointment', appointmentSchema);
