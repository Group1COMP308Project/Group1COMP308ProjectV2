const { gql } = require('apollo-server-express');

const patientTypeDefs = gql`
  type Patient {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    bodyTemperature: Float
    heartRate: Float
    bloodPressure: String
    respiratoryRate: Float
  }

  type AuthPayload {
    token: String!
    patient: Patient!
  }

  type Query {
    me: Patient  # Sample query to fetch patient details
  }

  type Mutation {
    signup(firstName: String!, lastName: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }
`;

module.exports = patientTypeDefs;

