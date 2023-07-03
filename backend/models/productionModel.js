const mongoose = require('mongoose');

const productionSchema = new mongoose.Schema({
    productionId:{
        type:Number,
        required:true
    },
    productionName:{
        type:String,
        required:true
    },
    logoPath:String,
    country:String
});

module.exports = new mongoose.model('production',productionSchema);