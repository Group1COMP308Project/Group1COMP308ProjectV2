const mongoose = require('mongoose');

const FitnessGamesSchema = new mongoose.Schema({

    Activity: {
        type: String,
        required:true
    }



})

const FitnessGame = mongoose.model('Fitness Game',FitnessGamesSchema);
module.exports = FitnessGame;

