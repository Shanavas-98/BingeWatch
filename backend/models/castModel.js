const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
    castId:{
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

module.exports = new mongoose.model('cast',castSchema);