const mongoose = require('mongoose');

const motivationalTipsSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nurse', // Reference to Nurse model
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const MotivationalTips = mongoose.model('MotivationalTips', motivationalTipsSchema);

module.exports = MotivationalTips;