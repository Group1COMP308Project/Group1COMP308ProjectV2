const { gql } = require('apollo-server-express');

const symptomTypeDefs = gql`

type Patient {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
}

enum SymptomList {
  Fever
  Cough
  ShortnessOfBreath
  Fatigue
  MuscleOrBodyAches
  LossOfTasteOrSmell
  SoreThroat
  CongestionOrRunnyNose
  NauseaOrVomiting
  Diarrhea
}


type Symptom {
  id: ID!
  patient: Patient!
  symptoms: [SymptomList!]!
  createdAt: String!
}

input SymptomInput {
  patientId: ID!
  symptoms: [SymptomList!]!
}

type Query {
  getSymptoms(patientId: ID!): [Symptom!]!
}

type Mutation {
  addSymptom(input: SymptomInput!): Symptom!
}

`;

module.exports = symptomTypeDefs;
