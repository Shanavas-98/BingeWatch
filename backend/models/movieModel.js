const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    movieId:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    genreIds:[Number],
    overview:{
        type:String
    },
    rating:{
        type:Number
    },
    releaseDate:{
        type:String,
        required:true
    }
});

module.exports = new mongoose.model("movie",movieSchema);