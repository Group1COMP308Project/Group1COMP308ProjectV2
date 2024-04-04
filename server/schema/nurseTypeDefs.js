const { gql } = require('apollo-server-express');

const patientTypeDefs = gql`
  type Nurse {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String!
    nurse: Nurse!
  }

  type Query {
    me: Nurse
  }

  type Mutation {
    signup(firstName: String!, lastName: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }
`;

module.exports = patientTypeDefs;
