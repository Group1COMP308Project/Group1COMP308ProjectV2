// patientModel.js

const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  bodyTemperature: {
    type: Number
  },
  heartRate: {
    type: Number
  },
  bloodPressure: {
    type: String
  },
  respiratoryRate: {
    type: Number
  }
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
