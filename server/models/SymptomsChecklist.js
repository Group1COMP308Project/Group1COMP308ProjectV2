const mongoose = require('mongoose');

//schema for symptoms checklist
const symptomsChecklistSchema = new mongoose.Schema({
  patientEmail: {
    type: String,
    required: true,
  },
  symptoms: {
    type: [String], // Array of symptoms
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a Mongoose model based on the schema
const SymptomsChecklist = mongoose.model('SymptomsChecklist', symptomsChecklistSchema);

module.exports = SymptomsChecklist;
