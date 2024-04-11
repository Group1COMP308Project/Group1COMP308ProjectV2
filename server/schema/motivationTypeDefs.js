const { gql } = require('apollo-server-express');

const motivationTipTypeDefs = gql`

type Nurse {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
}

  type MotivationTip {
    id: ID!
    content: String!
    nurse: Nurse!
  }

  type Query {

    allMotivationTips: [MotivationTip!]!
  }

  type Mutation {
    addMotivationTip(content: String!, email: String!): MotivationTip
  }
`;

module.exports = motivationTipTypeDefs;