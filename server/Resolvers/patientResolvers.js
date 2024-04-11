// Import required modules
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');
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
    // Resolver for fetching all visits
    allVisits: async () => {
      try {
        // Fetch all visits from the database
        const visits = await Visit.find();
        return visits;
      } catch (error) {
        throw new Error('Failed to fetch visits');
      }
    },
    allPatients: async () => {
      try {
        // Fetch all patients from the database
        const patients = await Patient.find();
        return patients;
      } catch (error) {
        throw new Error('Failed to fetch patients');
      }
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
      try {
        // Find patient by email
        const patient = await Patient.findOne({ email });

        // If patient not found, throw error
        if (!patient) {
          throw new Error('Patient not found');
        }

        // Create the visit and associate it with the patient's email
        const visit = new Visit({
          bodyTemperature,
          heartRate,
          bloodPressure,
          respiratoryRate,
          patient: email, // Associate visit with patient's email
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

module.exports = resolvers;
