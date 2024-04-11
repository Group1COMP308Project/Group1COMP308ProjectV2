

const Symptom = require('../models/Symptom');
const Patient = require('../models/Patient');

const resolvers = {
  Query: {
    getSymptoms: async (_, { patientId }, context) => {
      try {
        // Fetch symptoms based on the patientId and populate the 'patient' field
        const symptoms = await Symptom.find({ patient: patientId }).populate('patient');

        // Ensure the returned ID is a string
        const formattedSymptoms = symptoms.map(symptom => ({
          id: symptom._id.toString(),
          patient: {
            id: symptom.patient._id.toString(),
            firstName: symptom.patient.firstName,
            lastName: symptom.patient.lastName,
            email: symptom.patient.email,
          },
          symptoms: symptom.symptoms,
          createdAt: symptom.createdAt.toISOString(), // Format date as needed
        }));

        return formattedSymptoms;
      } catch (error) {
        console.error("Error fetching symptoms:", error);
        throw error; // Throw the error to be caught by Apollo Server
      }
    },
  },
  Mutation: {
    addSymptom: async (_, { input }) => {
      const { patientId, symptoms } = input;
      
      // Assuming you have a method to find the patient by ID
      const patient = await Patient.findById(patientId);

      // Create the new Symptom object
      const newSymptom = new Symptom({
        patient,
        symptoms,
        createdAt: new Date().toISOString(),
      });

      // Save the new symptom to the database
      await newSymptom.save();

      return newSymptom;
    }
  }
};

module.exports = resolvers;
