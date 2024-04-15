const mongoose = require('mongoose');

const FitnessGameSchema = new mongoose.Schema({
    points: {
        type: Number, 
        required: true,
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient', 
        required: true,
    },
});

const FitnessGame = mongoose.model('FitnessGame', FitnessGameSchema);
module.exports = FitnessGame;