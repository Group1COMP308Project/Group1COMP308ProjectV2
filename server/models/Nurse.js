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
    unique: true, 
    //should have @ symbol and '.'
    match: [/.+\@.+\..+/, "Please fill a valid email address"]
  },
  password: {
    type: String,
    required: true, 
    //6 characters or more for validation
    validate: [
			(password) => password && password.length > 6,
			'Password should be longer'
		]
  }
});

const Nurse = mongoose.model('Nurse', nurseSchema);

module.exports = Nurse;
