# G4-Clinic-Appointment-System

This RESTful API manages **patients**, **doctors**, and **appointments** for a clinic.  
Built with **MongoDB (Mongoose)**

---

## Base URL

- Local: `http://localhost:3000`
- live : 

## API Endpoints

| **Entity** | **Method** | **Endpoint** | **Description** |
|-------------|-------------|---------------|------------------|
| Patients 
|  |GET     | `/api/patients` | Get all patients |
|  | GET    | `/api/patients/:id` | Get a specific patient |
|  | POST   | `/api/patients` | Create a new patient |
|  | PUT    | `/api/patients/:id` | Update patient details |
|  | DELETE | `/api/patients/:id` | Delete a patient |
| Doctors 
|  | GET    | `/api/doctors` | Get all doctors |
|  | GET    | `/api/doctors/:id` | Get a specific doctor |
|  | POST   | `/api/doctors` | Create a new doctor |
|  | PUT    | `/api/doctors/:id` | Update doctor details |
|  | DELETE | `/api/doctors/:id` | Delete a doctor |
| Appointments
|  |GET     | `/api/appointments` | Get all appointments |
|  | GET    | `/api/appointments/:id` | Get a specific appointment |
|  | POST   | `/api/appointments` | Create a new appointment |
|  | PUT    | `/api/appointments/:id` | Update appointment details |
|  | DELETE | `/api/appointments/:id` | Delete an appointment |

 
