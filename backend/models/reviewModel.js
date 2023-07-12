const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const reviewSchema = new mongoose.Schema({
    user:{
        type: ObjectId,
        ref: 'user'
    },
    movie:{
        type:ObjectId,
        ref: 'movie'
    },
    rating:Number,
    review:String,
    likeCount:{
        type:Number,
        default:0
    },
    likedBy:[{
        type: ObjectId,
        ref: 'user'
    }],
    dislikeCount:{
        type:Number,
        default:0
    },
    dislikedBy:[{
        type: ObjectId,
        ref: 'user'
    }]
});

module.exports = new mongoose.model('review',reviewSchema);