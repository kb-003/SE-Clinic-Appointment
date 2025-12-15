const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  birthDate: { type: Date, required: true },
  email: { type: String, required: true, trim: true, lowercase: true, unique: true },
  phone: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
