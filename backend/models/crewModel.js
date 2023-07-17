const mongoose = require('mongoose');

const crewSchema = new mongoose.Schema({
    crewId:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    profile:String,
    biography:String,
    birthday:String,
    deathday:String,
    gender:{
        type:String,
        required:true
    },
    department:String,
    placeOfBirth:String,
    popularity:{
        type:Number,
        required:true
    },
    knownFor:[Number]
});

module.exports = new mongoose.model('crew',crewSchema);