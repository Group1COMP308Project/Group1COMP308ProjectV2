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
    bodyTemperature: Float!
    heartRate: Float!
    bloodPressure: String!
    respiratoryRate: Float!
    patient: Patient!
    # Add more fields as needed
  }

  type AuthPayload {
    token: String!
    patient: Patient!
  }

  type Query {
    me: Patient  # Sample query to fetch patient details
    allVisits: [Visit!]!
  }

  type Mutation {
    signup(firstName: String!, lastName: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    addVisit(email: String!, bodyTemperature: Float, heartRate: Float, bloodPressure: String, respiratoryRate: Float): Visit
  }
`;

module.exports = patientTypeDefs;

