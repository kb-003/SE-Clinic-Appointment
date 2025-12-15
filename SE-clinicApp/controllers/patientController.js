const Patient = require('../models/patientModel'); 

// Create patient
exports.createPatient = async (req, res) => {
  try {
    const { name, birthDate, email, phone } = req.body;
    
    // Validation
    if (!name || !birthDate || !email || !phone) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    const patient = new Patient({ name, birthDate, email, phone });
    const savedPatient = await patient.save();
    
    res.status(201).json(savedPatient);
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate email (if email is unique in schema)
      res.status(400).json({ message: 'Email already exists. Please use another email.' });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
};

// Get single patient
exports.getPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.json(patients); // Returns array of patients
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update patient
exports.updatePatient = async (req, res) => {
  try {
    const { name, birthDate, email, phone } = req.body;
    const data = { name, birthDate, email, phone };
    
    const patient = await Patient.findByIdAndUpdate(
      req.params.id, 
      data, 
      { new: true, runValidators: true }
    );
    
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
};

// Delete patient
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};