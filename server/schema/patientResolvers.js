// Import required modules
const bcrypt = require('bcryptjs');  // Import bcrypt for password hashing
const jwt = require('jsonwebtoken');  // Import jsonwebtoken for token creation
const Patient = require('../models/Patient');  // Import Patient model
const Visit = require('../models/Visit');

// Function to create JWT token
const createToken = (patient, secret) => {
  const { id, email } = patient;
  return jwt.sign({ userId: id, email }, secret);
};

// Define resolvers for GraphQL schema
const resolvers = {
  Query: {
    // Resolver for 'me' query to fetch current patient's information
    me: async (_, __, { req }) => {
      // Check if user is authenticated
      if (!req.userId) {
        throw new Error('You are not authenticated');
      }
      // Find patient by ID and return
      const patient = await Patient.findById(req.userId);
      return patient;
    },
  },
  Mutation: {
    // Resolver for 'signup' mutation to register a new patient
    signup: async (_, { firstName, lastName, email, password }) => {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create patient in the database
      const patient = await Patient.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      // Create JWT token
      const token = createToken(patient, 'mysecretkey');
      // Return token and patient information
      return { token, patient };
    },
    // Resolver for 'login' mutation to authenticate patient
    login: async (_, { email, password }) => {
      // Find patient by email
      const patient = await Patient.findOne({ email });
      // If patient not found, throw error
      if (!patient) {
        throw new Error('Invalid login');
      }
      // Compare passwords
      const valid = await bcrypt.compare(password, patient.password);
      // If passwords don't match, throw error
      if (!valid) {
        throw new Error('Invalid login');
      }
      // Create JWT token
      const token = createToken(patient, 'mysecretkey');
      // Return token and patient information
      return { token, patient };
    },
    // Resolver for adding a new visit for a patient
    addVisit: async (_, { email, bodyTemperature, heartRate, bloodPressure, respiratoryRate }) => {
      // Find patient by email
      const patient = await Patient.findOne({ email });
      
      // If patient not found, throw error
      if (!patient) {
        throw new Error('Patient not found');
      }
      
      // Create the visit and associate it with the patient
      const visit = new Visit({
        bodyTemperature,
        heartRate,
        bloodPressure,
        respiratoryRate,
        patient: patient._id, // Associate visit with patient's ID
      });
      
      // Save the visit to the database
      await visit.save();
      
      // Return the created visit
      return visit;
    },
  },
};

module.exports = resolvers;
