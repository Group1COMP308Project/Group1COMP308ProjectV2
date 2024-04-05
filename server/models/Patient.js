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
    unique: true, 
    match: [/.+\@.+\..+/, "Please fill a valid email address"]
  },
  password: {
    type: String,
    required: true, 
    validate: [
			(password) => password && password.length > 6,
			'Password should be longer'
		]
  }
});


// Set the 'fullname' virtual property
patientSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
	const splitName = fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});

// Configure the 'patientSchema' to use getters and virtuals when transforming to JSON
patientSchema.set('toJSON', {
	getters: true,
	virtuals: true
});



const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
