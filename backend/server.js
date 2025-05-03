const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors({
  origin: [
    
  "https://apollo-clone-task.vercel.app",
    "http://localhost:3000"             // For local testing
  ]
}));

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // To parse incoming JSON data

// MongoDB connection
mongoose.connect('mongodb+srv://Adarsh3:root@adarsh1.xzfbaub.mongodb.net/Apollo-content?retryWrites=true&w=majority&appName=Adarsh1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Doctor Schema and Model
const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  modeOfConsult: { type: [String], required: true },
  experience: { type: String, required: true },
  fees: { type: String, required: true },
  language: { type: [String], required: true },
  facility: { type: [String], required: true },
});

const Doctor = mongoose.model('Doctor', doctorSchema);

// Controller to add a doctor (unchanged)
const addDoctor = async (req, res) => {
  try {
    const data = req.body;

    if (Array.isArray(data)) {
      // Bulk insert
      const newDoctors = await Doctor.insertMany(data);
      res.status(201).json({ message: 'Doctors added successfully', doctors: newDoctors });
    } else {
      // Single insert
      const { name, modeOfConsult, experience, fees, language, facility } = data;
      const newDoctor = new Doctor({ name, modeOfConsult, experience, fees, language, facility });
      await newDoctor.save();
      res.status(201).json({ message: 'Doctor added successfully', doctor: newDoctor });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error adding doctor(s)', error: error.message });
  }
};

// Updated controller to fetch doctors with filters
const listDoctorsWithFilters = async (req, res) => {
  const { modeOfConsult, experience, fees, language, facility, page = 1, limit = 10 } = req.query;

  const filters = {};

  // Apply filters if they exist
  if (modeOfConsult) {
    filters.modeOfConsult = { $in: modeOfConsult.split(',') };
  }

  if (experience) {
    filters.experience = { $in: experience.split(',') }; // Direct string comparison
  }

  if (fees) {
    filters.fees = { $in: fees.split(',') }; // Direct string comparison
  }

  if (language) {
    filters.language = { $in: language.split(',') };
  }

  if (facility) {
    filters.facility = { $in: facility.split(',') };
  }

  try {
    const doctors = await Doctor.find(filters)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalDoctors = await Doctor.countDocuments(filters);

    res.status(200).json({
      totalDoctors,
      doctors,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching doctors', error: error.message });
  }
};

// API Routes (unchanged)
app.post('/api/doctors/add-doctor', addDoctor);
app.get('/api/doctors/list-doctors', listDoctorsWithFilters);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
