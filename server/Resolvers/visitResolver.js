const Visit = require('../models/Visit');
const Patient = require('../models/Patient');

const visitResolver = {
  Query: {
    allVisits: async () => {
      try {
        // Fetch all visits from the database
        const visits = await Visit.find().populate('patient');
        return visits;
      } catch (error) {
        throw new Error('Failed to fetch visits');
      }
    },
  },
  Mutation: {
    addVisit: async (_, { email, bodyTemperature, heartRate, bloodPressure, respiratoryRate, visitDate }) => {
      try {
        // Find patient by email
        const patient = await Patient.findOne({ email });

        // If patient not found, throw error
        if (!patient) {
          throw new Error('Patient not found');
        }

        // Create the visit and associate it with the patient's ObjectId
        const visit = new Visit({
          bodyTemperature,
          heartRate,
          bloodPressure,
          respiratoryRate,
          visitDate, // Include visitDate in the Visit object
          patient: patient._id, // Associate visit with patient's ObjectId
        });

        // Save the visit to the database
        await visit.save();

        // Ensure that the visit object returned includes the patient field
        visit.patient = patient; // Assign the patient object to the visit's patient field

        // Return the created visit
        return visit;
      } catch (error) {
        // Handle errors
        throw new Error('Failed to add visit');
      }
    },
  },
};

module.exports = visitResolver;
