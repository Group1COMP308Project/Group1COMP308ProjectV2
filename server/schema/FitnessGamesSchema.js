const {gql} = require('apollo-server-express');

const FitnessGame = gql`
type FitnessGame {
    id: ID!
    activity: String!
    Games:[Patient]
}

type Patient {
    Id:ID!
    firstname: String!
    lastname: String!
    x: FitnessGame
}

type Query {
    _x : FitnessGame
}

type Mutation {
    enrollactivity(firstName: String!,lastName: String!,Activity:String!)

}

`;

module.exports = FitnessGame;