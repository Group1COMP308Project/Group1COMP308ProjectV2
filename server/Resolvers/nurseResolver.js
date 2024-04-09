const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Nurse = require('../models/Nurse');

const resolvers = {
  Query: {
    me: async (_, __, { req }) => {
      // Check authentication
      if (!req.userId) {
        throw new Error('You are not authenticated');
      }
      // Fetch and return the logged-in user
      const nurse = await Nurse.findById(req.userId);
      return nurse;
    },
  },
  Mutation: {
    signup: async (_, { firstName, lastName, email, password }) => {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create a new Nurse
      const nurse = await Nurse.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      // Generate JWT token
      const token = jwt.sign({ userId: nurse.id }, 'mysecretkey');
      return { token, nurse };
    },
    login: async (_, { email, password }) => {
      // Find Nurse by email
      const nurse = await Nurse.findOne({ email });
      if (!nurse) {
        throw new Error('Invalid login');
      }
      // Verify password
      const valid = await bcrypt.compare(password, nurse.password);
      if (!valid) {
        throw new Error('Invalid login');
      }
      // Generate JWT token
      const token = jwt.sign({ userId: nurse.id }, 'mysecretkey');
      return { token, nurse };
    },
    
  },
};

module.exports = resolvers;
