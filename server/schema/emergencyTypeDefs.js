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

  type AuthPayload {
    token: String!
    patient: Patient!
  }

  type Query {
    me: Patient # Sample query to fetch patient details
    allEmergencies: [Emergency!]!
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
