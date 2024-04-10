const { gql } = require('apollo-server-express');

const motivationTipTypeDefs = gql`
  type MotivationTip {
    id: ID!
    content: String!
    nurse: Nurse!
  }

  type Query {
    allMotivationTips: [MotivationTip!]!
  }

  type Mutation {
    addMotivationTip(content: String!, nurseEmail: String!): MotivationTip
  }
`;

module.exports = motivationTipTypeDefs;