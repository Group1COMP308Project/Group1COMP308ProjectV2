const Visit = require('../models/Visit');

const visitResolver = {
  Query: {
    allVisits: async () => {
      try {
        // Fetch all visits from the database
        const visits = await Visit.find();
        return visits;
      } catch (error) {
        throw new Error('Failed to fetch visits');
      }
    },
  },
};

module.exports = visitResolver;
