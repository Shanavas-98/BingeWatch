const mongoose = require('mongoose');

const platformSchema = new mongoose.Schema({
    platformId:{
        type:Number,
        required: true
    },
    platformName:{
        type:String,
        required:true
    },
    logoPath:{
        type:String,
        required:true
    }
});

module.exports = new mongoose.model('platform',platformSchema);
