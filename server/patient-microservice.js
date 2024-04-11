// Import required modules
const express = require('express');  // Import Express framework
const { ApolloServer } = require('apollo-server-express');  // Import Apollo Server
const mongoose = require('mongoose');  // Import Mongoose for MongoDB interaction

const patientResolvers = require('./Resolvers/patientResolvers');  // Import resolvers for patient schema
const patientTypeDefs = require('./schema/patientTypeDefs');  // Import type definitions for patient schema
const Patient = require('./models/Patient');  // Import type definitions for patient schema

const emergencyResolvers = require('./Resolvers/EmergencyResolver');  // Import resolvers for patient schema
const emergencyTypeDefs = require('./schema/emergencyTypeDefs');  // Import type definitions for patient schema
const Emergency = require('./models/Emergency');  // Import type definitions for patient schema

const symptomsResolvers = require('./Resolvers/SymptomResolver');  // Import resolvers for patient schema
const symptomsTypeDefs = require('./schema/symptomTypeDefs');  // Import type definitions for patient schema
const Symptoms = require('./models/Symptom');  // Import type definitions for patient schema

const vitalsResolvers = require('./Resolvers/DailyVitalsResolver');  // Import resolvers for patient schema
const vitalsTypeDefs = require('./schema/dailyVitalsTypeDefs');  // Import type definitions for patient schema
const Vitals = require('./models/DailyVitals');  // Import type definitions for patient schema

const Visit = require('./models/Visit');  // Import type definitions for patient schema

// Initialize Express app
const app = express();

// Define port to listen on, using environment variable if available, else fallback to 4001
const PORT = process.env.PORT || 4001;

// Asynchronous function to start Apollo Server
async function startApolloServer() {
  // Create ApolloServer instance with type definitions, resolvers, and context
  const server = new ApolloServer({
    typeDefs: [patientTypeDefs, emergencyTypeDefs,symptomsTypeDefs, vitalsTypeDefs],
    resolvers: [patientResolvers, emergencyResolvers, symptomsResolvers, vitalsResolvers],
    context: ({ req }) => ({
      req,
      Patient,Visit,Emergency, Symptoms, Vitals 
    }),  
  });

  // Start Apollo Server
  await server.start();

  // Apply middleware to Express app
  server.applyMiddleware({ app });

  // Start Express app to listen on defined port
  await new Promise(resolve => app.listen({ port: PORT }, resolve));
  // Log server ready message with server's GraphQL path
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
}

// Connect to MongoDB database
mongoose.connect('mongodb://localhost/patientData', {})
  .then(() => {
    // Log successful MongoDB connection
    console.log('MongoDB connected');
    // Start Apollo Server after successful database connection
    startApolloServer();
  })
  .catch(err => console.error(err));  // Log error if MongoDB connection fails
