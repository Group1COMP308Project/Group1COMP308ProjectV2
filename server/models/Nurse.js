const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const nurseSchema = new Schema({
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
  }
});

const Nurse = mongoose.model('Nurse', nurseSchema);

module.exports = Nurse;
