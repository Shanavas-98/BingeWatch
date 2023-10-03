const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const watchlistSchema = mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'user'
    },
    movies: [{
        type: ObjectId,
        ref: 'movie'
    }],
    series: [{
        type: ObjectId,
        ref: 'series'
    }]
},{
    timestamps:true
});

module.exports = mongoose.model('watchlist', watchlistSchema);