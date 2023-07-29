const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const seasonSchema = new mongoose.Schema({
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
    episodes:[{
        airDate:String,
        episodeNum:Number,
        id:Number,
        title:String,
        duration:Number,
        poster:String,
        rating:Number,
    }],
    summary:String,
    poster:{
        type:String,
        required:true
    },
    seasonNum:Number,
    rating: {
        type: Number,
        required: true
    },
    videos: [String]
});

module.exports = new mongoose.model('season', seasonSchema);