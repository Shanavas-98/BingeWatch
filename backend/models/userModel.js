const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
        default:false
    },
    blocked:{
        type:Boolean,
        default:false
    }
})

userSchema.pre('save',async function(next) {
    if(!this.isModified('password')){
        return next();
    }
    const salt=await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

module.exports = new mongoose.model('user',userSchema);