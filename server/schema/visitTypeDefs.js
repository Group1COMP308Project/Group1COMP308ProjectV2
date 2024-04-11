const { gql } = require('apollo-server-express');

const visitTypeDefs = gql`
  type Patient {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }

  type Visit {
    id: ID!
    bodyTemperature: Float!
    heartRate: Float!
    bloodPressure: String!
    respiratoryRate: Float!
    visitDate: String! # New field for visitDate
    patient: Patient!
  }

  type VisitDisplay {
    id: ID!
    bodyTemperature: Float!
    heartRate: Float!
    bloodPressure: String!
    respiratoryRate: Float!
    visitDate: String! # New field for visitDate
    patient: String!
  }

  type AuthPayload {
    token: String!
    patient: Patient!
  }

  type Query {
    me: Patient # Sample query to fetch patient details
    allVisits: [Visit!]!
  }

  type Mutation {
    addVisit(
      email: String!
      bodyTemperature: Float
      heartRate: Float
      bloodPressure: String
      respiratoryRate: Float
      visitDate: String! # Include visitDate parameter
    ): Visit
  }
`;

module.exports = visitTypeDefs;
