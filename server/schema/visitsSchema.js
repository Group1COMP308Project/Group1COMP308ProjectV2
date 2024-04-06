const { gql } = require('apollo-server-express');

const visitSchema = gql`
  type Visit {
    id: ID!
    userId: ID!
    bodytemperature: Float!
    heartRate: Int!
    bloodpressure: Float!
    respiratoryrate: Int!
    created: String!
  }

  extend type Query {
    getVisit(id: ID!): Visit
    getVisits(userId: ID!): [Visit]
  }

  extend type Mutation {
    recordVisit(userId: ID!, bodyTemperature: Float!, heartrate: Int!, bloodpressure: String!, respiratoryrate: Int!): Visit
  }
`;

module.exports = visitSchema;
