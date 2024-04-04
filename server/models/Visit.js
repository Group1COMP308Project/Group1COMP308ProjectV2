//article.server.model.js
const mongoose = require('mongoose');

//course models with authorId, and student ref
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
  patients: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
}

});

const PatientModel = mongoose.model('Visit', VisitSchema);

module.exports = PatientModel;