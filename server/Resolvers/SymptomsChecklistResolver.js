const SymptomsChecklist = require('../models/SymptomsChecklist');

const resolvers = {
  Query: {
    getSymptomsChecklists: async (_, { patientId }) => {
      try {
        const checklists = await SymptomsChecklist.find({ patient: patientId });
        return checklists;
      } catch (error) {
        throw new Error(`Error fetching symptoms checklists: ${error.message}`);
      }
    },
  },
  Mutation: {
    createSymptomsChecklist: async (_, { input }) => {
      const { patientId, symptoms } = input;
      try {
        const newChecklist = new SymptomsChecklist({
          patient: patientId,
          symptoms,
        });
        const savedChecklist = await newChecklist.save();
        return savedChecklist;
      } catch (error) {
        throw new Error(`Error creating symptoms checklist: ${error.message}`);
      }
    },
  },
};

module.exports = resolvers;
