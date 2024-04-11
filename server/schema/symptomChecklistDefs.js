const { gql } = require('apollo-server-express');

const symptomsChecklistTypeDefs = gql`
  enum Symptom {
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

  type SymptomsChecklist {
    id: ID!
    patient: Patient!
    symptoms: [Symptom!]!
    createdAt: String!
  }

  input SymptomsChecklistInput {
    patientId: ID!
    symptoms: [Symptom!]!
  }

  type Query {
    getSymptomsChecklists(patientId: ID!): [SymptomsChecklist!]!
  }

  type Mutation {
    createSymptomsChecklist(input: SymptomsChecklistInput!): SymptomsChecklist!
  }
`;

module.exports = symptomsChecklistTypeDefs;
