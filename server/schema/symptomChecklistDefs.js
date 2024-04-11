const { gql } = require('apollo-server-express');

const symptomsChecklistTypeDefs = gql`
  type SymptomsChecklist {
    id: ID!
    patientEmail: String!
    symptoms: [String!]!
  }

  input SymptomsChecklistInput {
    patientEmail: String!
    symptoms: [String!]!
  }

  type Query {
    getSymptomsChecklists(patientEmail: String!): [SymptomsChecklist!]!
  }

  type Mutation {
    createSymptomsChecklist(input: SymptomsChecklistInput!): SymptomsChecklist!
  }
`;

module.exports = symptomsChecklistTypeDefs;
