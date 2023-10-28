const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const tokenSchema = new mongoose.Schema({
    user:{
        type:ObjectId,
        ref:'user',
        unique:true
    },
    token:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:3600
    }
});

module.exports = new mongoose.model('token',tokenSchema);
