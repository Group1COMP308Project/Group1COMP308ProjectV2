const DailyVitals = require('../models/DailyVitals');
const Patient = require('../models/Patient');

const dailyVitalsResolver = {
  Query: {
    allDailyVitals: async () => {
      try {
        // Fetch all daily vitals from the database
        const dailyVitals = await DailyVitals.find().populate('patient');
        return dailyVitals;
      } catch (error) {
        throw new Error('Failed to fetch daily vitals');
      }
    },
  },
  Mutation: {
    addDailyVitals: async (_, { email, pulseRate, bloodPressure, weight, temperature, respiratoryRate }) => {
      try {
        // Find patient by email
        const patient = await Patient.findOne({ email });

        // If patient not found, throw error
        if (!patient) {
          throw new Error('Patient not found');
        }

        // Create the daily vitals and associate it with the patient's ObjectId
        const dailyVitals = new DailyVitals({
          pulseRate,
          bloodPressure,
          weight,
          temperature,
          respiratoryRate,
          patient: patient._id, // Associate daily vitals with patient's ObjectId
        });

        // Save the daily vitals to the database
        await dailyVitals.save();

        // Ensure that the daily vitals object returned includes the patient field
        dailyVitals.patient = patient; // Assign the patient object to the daily vitals' patient field

        // Return the created daily vitals
        return dailyVitals;
      } catch (error) {
        // Handle errors
        throw new Error('Failed to add daily vitals');
      }
    },
  },
};

module.exports = dailyVitalsResolver;
