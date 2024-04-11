const mongoose = require('mongoose');

const symptomsSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient', // Reference to the Patient model
    required: true,
  },
  symptoms: {
    type: [{ type: String, enum: ['Fever', 'Cough', 'ShortnessOfBreath', 'Fatigue', 'MuscleOrBodyAches', 
                                  'LossOfTasteOrSmell', 'SoreThroat', 'CongestionOrRunnyNose', 'NauseaOrVomiting', 
                                  'Diarrhea'] }],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Symptom = mongoose.model('SymptomsChecklist', symptomsSchema);

module.exports = Symptom;
