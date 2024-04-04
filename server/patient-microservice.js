// Import required modules
const express = require('express');  // Import Express framework
const { ApolloServer } = require('apollo-server-express');  // Import Apollo Server
const mongoose = require('mongoose');  // Import Mongoose for MongoDB interaction
const patientResolvers = require('./schema/patientResolvers');  // Import resolvers for patient schema
const patientTypeDefs = require('./schema/patientTypeDefs');  // Import type definitions for patient schema
const Patient = require('./models/Patient');  // Import Patient model

// Initialize Express appgf
const app = express();

// Define port to listen on, using environment variable if available, else fallback to 4001
const PORT = process.env.PORT || 4001;

// Asynchronous function to start Apollo Server
async function startApolloServer() {
  // Create ApolloServer instance with type definitions, resolvers, and context
  const server = new ApolloServer({
    typeDefs: patientTypeDefs,
    resolvers: patientResolvers,
    context: ({ req }) => ({
      req,
      Patient  // Pass Patient model to context
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
mongoose.connect('mongodb://localhost/patientDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // Log successful MongoDB connection
    console.log('MongoDB connected');
    // Start Apollo Server after successful database connection
    startApolloServer();
  })
  .catch(err => console.error(err));  // Log error if MongoDB connection fails
