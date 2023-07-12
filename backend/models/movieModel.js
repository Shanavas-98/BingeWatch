const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

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
    genres: [{
        type: ObjectId,
        ref: 'genre',
    }],
    productions: [{
        type: ObjectId,
        ref: 'production',
    }],
    movieCollection: Number,
    summary: {
        type: String,
        required: true
    },
    images: [String],
    videos: [String],
    platforms: [{
        type: ObjectId,
        ref: 'platform',
    }],
    casts: [{
        cast: {
            type: ObjectId,
            ref: 'cast'
        },
        character: String,
        order: Number
    }],
    crews: [{
        crew: {
            type: ObjectId,
            ref: 'crew'
        },
        job: String,
        order: Number
    }]
});

module.exports = new mongoose.model('movie', movieSchema);