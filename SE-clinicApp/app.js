const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");


const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => {
    console.error('MongoDB Connection Error:', err.message);
    process.exit(1);
  });

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Root route
app.get("/", (req, res) => res.send("Clinic API is running!"));

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "API is running" });
});

// API prefix
app.use("/patients", patientRoutes);
app.use("/doctors", doctorRoutes);
app.use("/appointments", appointmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API URL: https://se-clinic-appointment.onrender.com`);
  console.log(`Available endpoints:`);
  console.log(`GET/POST/DELETE/patients`);
  console.log(`GET/POST/DELETE/doctors`);
  console.log(`GET/POST/DELETE/appointments`);
});