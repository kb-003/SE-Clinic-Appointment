require('dotenv').config();
const mongoose = require('mongoose');
const Patient = require('../models/patientModel');
const Doctor = require('../models/doctorModel');
const Appointment = require('../models/appointmentModel');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI required in .env for seeding');
  process.exit(1);
}

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to DB for seeding');

    await Promise.all([Patient.deleteMany(), Doctor.deleteMany(), Appointment.deleteMany()]);

    const p1 = await Patient.create({ name: 'Joie Casas', birthDate: '1999-07-23', email: 'jcasas@example.com', phone: '09123456789' });
    const p2 = await Patient.create({ name: 'Justin Garcia', birthDate: '2001-12-01', email: 'jgarcia@example.com', phone: '09246810124' });

    const d1 = await Doctor.create({ name: 'Dr. Ana Lopez', specialty: 'Pediatrics' });
    const d2 = await Doctor.create({ name: 'Dr. Byron Edward', specialty: 'General Surgery' });

    await Appointment.create({
      patientId: p1._id,
      doctorId: d1._id,
      startAt: new Date(Date.now() + 1000 * 60 * 60 * 24), 
      endAt: new Date(Date.now() + 1000 * 60 * 60 * 25),
      notes: 'Routine check-up'
    });

    await Appointment.create({
      patientId: p2._id,
      doctorId: d2._id,
      startAt: new Date(Date.now() + 1000 * 60 * 60 * 48),
      endAt: new Date(Date.now() + 1000 * 60 * 60 * 49),
      notes: 'High blood pressure monitoring'
    });

    console.log('Seeding complete');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error', err);
    process.exit(1);
  }
}

seed();
