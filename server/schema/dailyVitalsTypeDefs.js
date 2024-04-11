const { gql } = require('apollo-server-express');

const dailyVitalsTypeDefs = gql`
  type Patient {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }

  type DailyVitals {
    id: ID!
    pulseRate: Float!
    bloodPressure: String!
    weight: Float!
    temperature: Float!
    respiratoryRate: Float!
    date: String!
    patient: Patient!
  }


  type AuthPayload {
    token: String!
    patient: Patient!
  }

  type Query {
    me: Patient # Sample query to fetch patient details
    allDailyVitals: [DailyVitals!]!
  }

  type Mutation {
    addDailyVitals(
      email: String!
      pulseRate: Float!
      bloodPressure: String!
      weight: Float!
      temperature: Float!
      respiratoryRate: Float!
    ): DailyVitals
  }
`;

module.exports = dailyVitalsTypeDefs;
