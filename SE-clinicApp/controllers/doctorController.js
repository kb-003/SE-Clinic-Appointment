const Doctor = require('../models/doctorModel');

// Create doctor
exports.createDoctor = async (req, res) => {
  try {
    const { name, specialty } = req.body;
    if (!name || !specialty) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const doctor = await Doctor.create({ name, specialty });
    res.status(201).json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single doctor
exports.getDoctor = async (req, res) => {
  try {
    const d = await Doctor.findById(req.params.id);
    if (!d) return res.status(404).json({ message: 'Doctor not found' });
    res.json(d);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List doctors (with optional search)
exports.listDoctors = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);
    const skip = (page - 1) * limit;
    const q = {};
    if (req.query.name) q.name = new RegExp(req.query.name, 'i');
    if (req.query.specialty) q.specialty = new RegExp(req.query.specialty, 'i');

    const [items, count] = await Promise.all([
      Doctor.find(q).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Doctor.countDocuments(q)
    ]);

    res.json({ page, limit, total: count, items });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update doctor
exports.updateDoctor = async (req, res) => {
  try {
    const data = (({ name, specialty }) => ({ name, specialty }))(req.body);
    const d = await Doctor.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!d) return res.status(404).json({ message: 'Doctor not found' });
    res.json(d);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete doctor
exports.deleteDoctor = async (req, res) => {
  try {
    const d = await Doctor.findByIdAndDelete(req.params.id);
    if (!d) return res.status(404).json({ message: 'Doctor not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
