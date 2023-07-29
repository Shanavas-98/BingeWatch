const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const seriesSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    adult: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    genres: [{
        type: ObjectId,
        ref: 'genre',
    }],
    airDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    totalEpisodes:Number,
    totalSeasons:Number,
    tagline:String,
    status:String,
    popularity: {
        type: Number
    },
    backdrop:{
        type:String
    },
    poster:{
        type:String
    },
    images: [String],
    videos: [String],
    createdBy: [{
        crew: {
            type: ObjectId,
            ref: 'crew'
        },
        tmdbId:Number,
        name:String,
        profile:String
    }],
    networks: [{
        type: ObjectId,
        ref: 'production',
    }],
    platforms: [{
        type: ObjectId,
        ref: 'platform',
    }],
    productions: [{
        type: ObjectId,
        ref: 'production',
    }],
    seasons:[{
        id:Number,
        seasonNum:Number,
        title:String,
        poster:String,
        airDate:String,
        totalEpisodes:Number,
        rating:Number
    }],
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
});

module.exports = new mongoose.model('series', seriesSchema);