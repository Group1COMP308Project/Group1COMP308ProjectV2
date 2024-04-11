const mongoose = require('mongoose');

const symptomsChecklistSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient', // Reference to the Patient model
    required: true,
  },
  symptoms: {
    type: [{ type: String, enum: ['Fever', 'Cough', 'Shortness of breath', 'Fatigue', 'Muscle or body aches', 'Loss of taste or smell', 'Sore throat', 'Congestion or runny nose', 'Nausea or vomiting', 'Diarrhea'] }],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SymptomsChecklist = mongoose.model('SymptomsChecklist', symptomsChecklistSchema);

module.exports = SymptomsChecklist;
