const Emergency = require('../models/Emergency');
const Patient = require('../models/Patient');

const emergencyResolver = {
  Query: {
    allEmergencies: async () => {
      try {
        // Fetch all emergencies from the database and populate the 'patient' field
        const emergencies = await Emergency.find().populate('patient');
   
        return emergencies;
      } catch (error) {
        throw new Error('Failed to fetch emergencies');
      }
    },
  },
  Mutation: {
    addEmergency: async (_, { email, type, message, alertTime}) => {
      try {
        // Find patient by email
        const patient = await Patient.findOne({email});

        // If patient not found, throw error
        if (!patient) {
          throw new Error('Patient not found');
        }

        // Create the emergency and associate it with the patient's ObjectId
        const emergency = new Emergency({
            email,
            type,
            message,
            alertTime,
          patient: patient._id, // Associate emergency with patient's ObjectId
        });

        // Save the emergency to the database
        await emergency.save();

        // Ensure that the emergency object returned includes the patient field
        emergency.patient = patient; // Assign the patient object to the emergency's patient field

        // Return the created emergency
        return emergency;
      } catch (error) {
        // Handle errors
        throw new Error('Failed to add emergency');
      }
    },
  },
};

module.exports = emergencyResolver;
