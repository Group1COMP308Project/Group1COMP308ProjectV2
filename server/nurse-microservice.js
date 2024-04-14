// Import required modules
const express = require('express');  // Import Express framework
const { ApolloServer } = require('apollo-server-express');  // Import Apollo Server
const mongoose = require('mongoose');  // Import Mongoose for MongoDB interaction
const nurseResolvers = require('./Resolvers/nurseResolver');  // Import resolvers
const nurseTypeDefs = require('./schema/nurseTypeDefs');  // Import type definitions
const Nurse = require('./models/Nurse')


const motivationResolvers = require('./Resolvers/motivationTipResolver');  // Import resolvers
const motivationTypeDefs = require('./schema/motivationTypeDefs');  // Import type definitions
const Motivation = require('./models/MotivationTip');  // Import type definitions
const indexController = require('./controllers/index.server.controller');


// Initialize Express app
const app = express();

// Define port to listen on, using environment variable if available, else fallback to 4000
const PORT = process.env.PORT || 4000;

// Define route for triggering model training and prediction
//app.get('/train-and-predict', indexController.trainAndPredict);


// Asynchronous function to start Apollo Server
async function startApolloServer() {
  // Create ApolloServer instance with type definitions, resolvers, and context
  const server = new ApolloServer({
    typeDefs: [nurseTypeDefs, motivationTypeDefs],
    resolvers: [nurseResolvers, motivationResolvers],

    context: ({ req }) => ({ req, Nurse, Motivation }),  // Pass request object to resolvers
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
mongoose.connect('mongodb://localhost/nurseDB2', {})
  .then(() => {
    // Log successful MongoDB connection
    console.log('MongoDB connected');
    // Start Apollo Server after successful database connection
    startApolloServer();
  })
  .catch(err => console.error(err));  // Log error if MongoDB connection fails
