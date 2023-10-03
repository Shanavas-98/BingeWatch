const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    genreId:{
        type:Number,
        required: true
    },
    genreName:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

module.exports = new mongoose.model('genre',genreSchema);
