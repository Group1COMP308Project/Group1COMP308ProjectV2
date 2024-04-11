const mongoose = require('mongoose');

// Visit Schema
const EmergencySchema = new mongoose.Schema({
  type: {
    type: String
  },
  message: {
    type: String
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  },
  alertTime: {
    type: Date,
    default: Date.now 
  }
});

const Emergency = mongoose.model('Emergency', EmergencySchema);

module.exports = Emergency;
