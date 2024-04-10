const { gql } = require('apollo-server-express');

const emergencyTypeDefs = gql`
  type Patient {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }

  type Emergency {
    id: ID!
    type: String!
    message: String!
    alertTime: String!
    patient: Patient!
  }

  type EmergencyDisplay {
    id: ID!
    type: String!
    message: String!
    alertTime: String!
    patient: String!
  }

  type AuthPayload {
    token: String!
    patient: Patient!
  }

  type Query {
    me: Patient # Sample query to fetch patient details
    allEmergencies: [EmergencyDisplay!]!
  }

  type Mutation {
    addEmergency(
      email: String!
      type: String!
      message: String!
      alertTime: String!
    ): Emergency
  }

`;








module.exports = emergencyTypeDefs;
