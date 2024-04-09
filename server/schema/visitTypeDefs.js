const { gql } = require('apollo-server-express');

const visitTypeDefs = gql`
  type Visit {
    id: ID!
    bodyTemperature: Float!
    heartRate: Float!
    bloodPressure: String!
    respiratoryRate: Float!
    # Add more fields as needed
  }

  type Query {
    allVisits: [Visit!]!
  }
`;

module.exports = visitTypeDefs;
