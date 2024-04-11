const SymptomsChecklist = require('./models/SymptomsChecklist');

const resolvers = {
  Query: {
    // Resolver function to fetch all symptoms checklists for a specific patient
    getSymptomsChecklists: async (_, { patientEmail }) => {
      try {
        const checklists = await SymptomsChecklist.find({ patientEmail });
        return checklists;
      } catch (error) {
        throw new Error(`Error fetching symptoms checklists: ${error.message}`);
      }
    },
  },
  Mutation: {
    //resolver function to create a new symptoms checklist entry
    createSymptomsChecklist: async (_, { input }) => {
      const { patientEmail, symptoms } = input;
      try {
        // Create a new SymptomsChecklist document
        const newChecklist = new SymptomsChecklist({
          patientEmail,
          symptoms,
        });
        //saving the new document to database
        const savedChecklist = await newChecklist.save();
        return savedChecklist;
      } catch (error) {
        throw new Error(`Error creating symptoms checklist: ${error.message}`);
      }
    },
  },
};

module.exports = resolvers;
