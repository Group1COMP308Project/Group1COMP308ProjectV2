const mongoose = require('mongoose');

const motivationTipSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  nurse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nurse', // Reference to Nurse model
    required: true,
  },
});

const MotivationTip = mongoose.model('MotivationTip', motivationTipSchema);

module.exports = MotivationTip;