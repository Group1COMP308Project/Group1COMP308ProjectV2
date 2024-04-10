const mongoose = require('mongoose');

// Visit Schema
const VisitSchema = new mongoose.Schema({
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
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  },
  visitDate: {
    type: Date,
    default: Date.now // Set default value to current datetime
  }
});

const Visit = mongoose.model('Visit', VisitSchema);

module.exports = Visit;
