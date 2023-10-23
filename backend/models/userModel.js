const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
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
    friends: [
        {
            type:ObjectId,
            ref:'user'
        }
    ],
    picture:{
        file:String,
        url:String
    },
    verified:{
        type:Boolean,
        default:false
    },
    blocked:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});

// Method to update and encrypt the password
userSchema.methods.updatePassword = async function(newPassword) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(newPassword, salt);
};

// Method to encrypt password of new user
userSchema.pre('save',async function(next) {
    if(!this.isModified('password')){
        return next();
    }
    const salt=await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

module.exports = new mongoose.model('user',userSchema);