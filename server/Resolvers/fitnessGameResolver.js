const FitnessGame = require('../models/FitnessGame');
const Patient = require('../models/Patient');

const fitnessGameResolver = {
    Mutation: {
        addPoints: async (_, { patientId, points }) => {
            try {
                // Find the fitness game entry for the patient
                let fitnessGame = await FitnessGame.findOne({ patient: patientId });

                // If fitness game entry doesn't exist, create a new one
                if (!fitnessGame) {
                    // Check if the patient exists
                    const patient = await Patient.findById(patientId);
                    if (!patient) {
                        throw new Error('Patient not found');
                    }

                    fitnessGame = new FitnessGame({
                        points,
                        patient: patientId,
                    });
                } else {
                    // Add points to the existing fitness game entry
                    fitnessGame.points += points;
                }

                // Save the updated fitness game entry
                await fitnessGame.save();

                return fitnessGame;
            } catch (error) {
                console.error('Error adding points to fitness game:', error); // Log the error for debugging
                throw new Error('Failed to add points to fitness game');
            }
        },
    },
    Query: {
        getTotalPointsByEmail: async (_, { email }) => {
            try {
                // Find the patient by email
                const patient = await Patient.findOne({ email });

                if (!patient) {
                    throw new Error('Patient not found');
                }

                // Find all fitness game entries for the patient
                const fitnessGames = await FitnessGame.find({ patient: patient._id });

                // Calculate the sum of points
                const totalPoints = fitnessGames.reduce((acc, curr) => acc + curr.points, 0);

                return totalPoints;
            } catch (error) {
                console.error('Error retrieving total points by email:', error);
                throw new Error('Failed to retrieve total points by email');
            }
        },
    },
};

module.exports = fitnessGameResolver;
