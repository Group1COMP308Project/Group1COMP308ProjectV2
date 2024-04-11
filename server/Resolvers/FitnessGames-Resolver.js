const FitnessSchema = require('../models/FitnessGames');
const PatientSchema = require('../models/Patient');
const { Mutation } = require('./visits-resolver');

const resolvers = {
    Query:{
        _x: async(x,r,{req})=> {

            const game = await FitnessSchema.findById(req.userId);
            return game;

        },

        GetAllGames: async() => {

            const games = await FitnessSchema.find();

            return games;

        }


    },


    Mutation: {


        Enroll: async(x,{patient,activity,id}) => {

            const konst  = await FitnessSchema.create({
                patient,
                activity,
                games: id
            });


            return konst;

        }
        
    }

}

module.exports = resolvers;