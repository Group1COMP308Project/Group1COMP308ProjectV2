const { gql } = require('apollo-server-express');

const patientTypeDefs = gql`
  type Patient {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    visits: [Visit]  # Define a field to fetch all visits associated with the patient
  }

  type Visit {
    id: ID!
    bodyTemperature: Float
    heartRate: Float
    bloodPressure: String
    respiratoryRate: Float
    patient: Patient  # Define a field to fetch the patient associated with the visit
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
    addVisit(email: String!, bodyTemperature: Float, heartRate: Float, bloodPressure: String, respiratoryRate: Float): Visit
  }
`;

module.exports = patientTypeDefs;

