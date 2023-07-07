const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    imdbId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    adult: {
        type: Boolean,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    popularity: {
        type: Number
    },
    duration: {
        type: String,
        required: true
    },
    releaseDate: {
        type: String,
        required: true
    },
    genres: [Number],
    productions: [Number],
    movieCollection: Number,
    summary: {
        type: String,
        required: true
    },
    images: [String],
    videos: [String],
    platforms: [Number],
    cast: [{
        castId: Number,
        character: String,
        order: Number
    }],
    crew: [{
        crewId: Number,
        job: String,
        order: Number
    }]
});

module.exports = new mongoose.model('movie', movieSchema);