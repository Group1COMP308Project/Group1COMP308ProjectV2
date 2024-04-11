const MotivationTip = require('../models/MotivationTip');
const Nurse = require('../models/Nurse');

const motivationTipResolver = {
  Query: {
    allMotivationTips: async () => {
      try {
        // Fetch all motivation tips from the database and populate the 'nurse' field
        const motivationTips = await MotivationTip.find().populate('nurse');
   
        return motivationTips;
      } catch (error) {
        throw new Error('Failed to fetch motivation tips');
      }
    },
  },
  Mutation: {
    addMotivationTip: async (_, { email, content }) => {
      try {
        // Find nurse by email
        const nurse = await Nurse.findOne({ email });
        if (!nurse) {
          throw new Error('Nurse not found');
        }

        // Create a new motivation tip
        const newMotivationTip = new MotivationTip({
          email,
          content,
          nurse: nurse._id,
        });

        // Save the new motivation tip to the database
        await newMotivationTip.save();

        newMotivationTip.nurse = nurse; 

        return newMotivationTip;
      } catch (error) {
        console.error('Error adding motivation tip:', error);
        throw new Error('Failed to add motivation tip');
      }
    },
  },
};

module.exports = motivationTipResolver;