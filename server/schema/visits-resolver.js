const { Visit } = require('../Models/nurse-models-server');

const resolvers = {
  Query: {
    getVisit: async (_, { id }) => await Visit.findById(id),
    getVisits: async (_, { userId }) => await Visit.find({ userId }),
  },
  Mutation: {
    recordVisit: async (_, { userId, bodyTemperature, heartRate, bloodPressure, respiratoryRate }) => {
      const visit = new Visit({
        userId,
        bodyTemperature,
        heartRate,
        bloodPressure,
        respiratoryRate,
        createdAt: new Date().toString(),
      });
      await visit.save();
      return visit;
    },
  },
};

module.exports = resolvers;
