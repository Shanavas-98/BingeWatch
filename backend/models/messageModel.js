const mongoose = require('mongoose');
const messageSchema = mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'chat'
    },
    content:{
        type:String,
        trim:true,
    }
},{timestamps:true});

module.exports = mongoose.model('message',messageSchema);