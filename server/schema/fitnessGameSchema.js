const { gql } = require('apollo-server-express');

const fitnessGameTypeDefs = gql`
  type FitnessGame {
    id: ID!
    points: Int!
    patient: Patient! # Reference to the Patient type
  }

  type Patient {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }

type Mutation {
    addPoints(patientId: ID!, points: Int!): FitnessGame!
  }

  type Query {
    getTotalPointsByEmail(email: String!): Int!
  }
`;

module.exports = fitnessGameTypeDefs;
