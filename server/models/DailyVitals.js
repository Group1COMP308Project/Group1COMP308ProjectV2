const mongoose = require('mongoose');

const dailyVitalsSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient', // Reference to the Patient model
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  pulseRate: {
    type: Number,
    required: true,
  },
  bloodPressure: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  respiratoryRate: {
    type: Number,
    required: true,
  },
});

const DailyVitals = mongoose.model('DailyVitals', dailyVitalsSchema);

module.exports = DailyVitals;
