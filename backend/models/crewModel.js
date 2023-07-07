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
    gender:{
        type:String,
        required:true
    },
    popularity:{
        type:Number,
        required:true
    }
});

module.exports = new mongoose.model('crew',crewSchema);