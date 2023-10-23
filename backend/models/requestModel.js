const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const requestSchema = new mongoose.Schema({
    user:{
        type: ObjectId,
        ref: 'user'
    },
    friend:{
        type:ObjectId,
        ref: 'user'
    },
    status:{
        type:String,
        default:'pending'
    }
},{
    timestamps:true
});

module.exports = new mongoose.model('request',requestSchema);