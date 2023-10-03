const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
    actorId:{
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
},{
    timestamps:true
});

module.exports = new mongoose.model('cast',castSchema);