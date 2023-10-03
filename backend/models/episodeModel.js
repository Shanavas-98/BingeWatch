const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const episodeSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    airDate: {
        type: String,
        required: true
    },
    show:{
        type:ObjectId,
        ref:'series'
    },
    season:{
        type:ObjectId,
        ref:'season'
    },
    seasonNum:Number,
    episodeNum:Number,
    summary:{
        type:String,
        required:true
    },
    duration: {
        type: Number,
        required: true
    },
    poster:{
        type:String,
        required:true
    },
    rating: {
        type: Number,
        required: true
    },
    images: [String],
    casts: [{
        cast: {
            type: ObjectId,
            ref: 'cast'
        },
        tmdbId:Number,
        name:String,
        character: String,
        profile:String
    }],
    guests: [{
        cast: {
            type: ObjectId,
            ref: 'cast'
        },
        tmdbId:Number,
        name:String,
        character: String,
        profile:String
    }],
    crews: [{
        crew: {
            type: ObjectId,
            ref: 'crew'
        },
        tmdbId:Number,
        name:String,
        job: String,
        profile:String
    }]
},{
    timestamps:true
});

module.exports = new mongoose.model('episode', episodeSchema);