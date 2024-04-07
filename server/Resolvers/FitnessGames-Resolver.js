const FitnessSchema = require('../models/FitnessGames');
const PatientSchema = require('../models/Patient');
const { Mutation } = require('./visits-resolver');

const resolvers = {
    Query:{
        _x: async(patient,game,{req})=> {

            const game = await PatientSchema.findById(req.userId);
            return PatientSchema;

        },


    },

    Mutation: {
        
    }



}