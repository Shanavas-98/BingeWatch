/* eslint-disable no-undef */
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const verifySid = process.env.TWILIO_VERIFY;
const client = require('twilio')(accountSid, authToken);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const watchlistModel = require('../models/watchlistModel');
const userModel = require('../models/userModel');
const createToken = require('../config/createToken');

let newUser;
const register = async (req, res) => {
    try {
        const { email, mobile } = req.body;
        const isEmail = await userModel.findOne({ email: email });
        if (isEmail) {
            return res.json({ message: 'user email already exists', status: false });
        }
        const isMobile = await userModel.findOne({ mobile: mobile });
        if (isMobile) {
            return res.json({ message: 'user mobile already exists', status: false });
        }

        newUser = req.body;

        client.verify.v2
            .services(verifySid)
            .verifications.create({ to: `+91${mobile}`, channel: 'sms' });
        res.json({ status: true });
    } catch (error) {
        res.json(error);
    }

};

const verifyOtp = async (req, res) => {
    const otpCode = req.body.otp;
    client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to: `+91${newUser.mobile}`, code: otpCode })
        .then(async (verification_check) => {
            if (verification_check.status === 'pending') {
                return res.json({ status: false, message: 'The OTP is invalid' });
            }
            if (verification_check.status === 'approved') {
                await userModel({
                    fullName: newUser.fullName,
                    email: newUser.email,
                    mobile: newUser.mobile,
                    password: newUser.password,
                    verified: true
                }).save()
                    .then(async (user) => {
                        const token = await createToken(user?._id);
                        const userData = {id:user?._id, name:user?.fullName, email:user?.email, token:token};
                        return res.json({ status: true, message: 'Verification successfull', userData });
                    });
            }
            if (verification_check.status === 429) {
                return res.json({ status: false, message: 'Max check attempts reached' });
            }
        });
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            throw Error('incorrect email');
        }
        const auth = await bcrypt.compare(password, user?.password);
        if (!auth) {
            throw Error('wrong password');
        }
        if(user?.blocked){
            throw Error('user is temporarily blocked');
        }
        const token = await createToken(user?._id);
        res.json({ id:user?._id, name:user?.fullName, email:user?.email, picture:user?.picture?.url, token });
    } catch (error) {
        res.json({error: error.message});
    }
};

const userAuth = async(req,res)=>{
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            let token=req.headers.authorization.split(' ')[1];
            if(!token || token==='null'){
                return res.json({ success: false, message: 'User token required' });
            }
            const decoded = jwt.verify(token,process.env.JWT_KEY);
            const user = await userModel.findById(decoded.id).select('-password');
            if(!user){
                return res.json({ success: false, message: 'User not exists' });
            }
            const userData = { id:user?._id, name:user?.fullName, email:user?.email, picture:user?.picture?.url, token };
            res.json({ success: true, message: 'User authorised', userData });
        }else{
            res.json({ success: false, message: 'User unauthorized' });
        }
    } catch (error) {
        res.json({ success: false, message: 'User unauthorized' });
    }
};

const home = async (req, res) => {
    try {
        console.log(req.body);
    } catch (error) {
        res.json(error);
    }
};

const fetchUserWatchlist = async (req,res) => {
    try {
        const userId = req.userId;
        const watchlist = await watchlistModel
            .find({user:userId})
            .populate('movies')
            .populate('series')
            .exec();
        res.json(watchlist);
    } catch (error) {
        res.json(error);
    }
};

const fetchUserDetails = async (req,res)=>{
    try {
        const userId = req.userId;
        const userData = await userModel.findOne({_id:userId},{password:0});
        res.json(userData);
    } catch (error) {
        res.json(error);
    }
};

const updateProfile = async(req,res)=>{
    try {
        const userId = req.userId;
        const {fullName} = req.body;
        if(!fullName){
            throw Error('all fields required');
        }
        await userModel.updateOne({_id:userId},{
            $set:{
                fullName
            }
        }).then(()=>{
            res.json({success: true, message:'profile updated successfully'});
        }).catch(()=>{
            res.json({success: false, message:'something went wrong'});
        });
    } catch (error) {
        res.json(error);
    }
};

const updateAvatar = async(req,res)=>{
    try{
        const { filename,path } = req.file;
        await userModel.updateOne({ _id: req.userId }, {
            $set: {
                picture: {file:filename,url:path}
            }
        }).then(()=>{
            res.json({ status: true, message: 'Profile updated successfully' });
        }).catch(()=>{
            res.json({ status: false, message: 'something went wrong' });
        });
    } catch (error) {
        res.json(error);
    }
};

const addFriend = async (req, res) => {
    try {
        const friendId = req.query.friendId;
        const result = await userModel.updateOne(
            { _id: req.userId }, // Query object
            {
                $addToSet: { friends: friendId } // Update object
            }
        );
        if(result.nModified === 0){
            return res.json({message:'Friend already exists'});
        }
        res.json({ message: 'Friend added successfully' });
    } catch (error) {
        res.json(error);
    }
};

// /users?search='username'
const allUsers = async(req,res)=>{
    try {
        const search = req.query?.search?.trim();
        const userId = req.userId;
        const keyword = search?{
            $or:[
                {fullName:{$regex:search, $options:'i'}},
                {email:{$regex:search, $options:'i'}}
            ]
        }:{};
        const users = await userModel.find(keyword).find({_id:{$ne:userId}});
        res.send(users);
    } catch (error) {
        console.error('Error all users:',error.message);
    }
};


module.exports = { register, verifyOtp, login, home, userAuth, fetchUserWatchlist, fetchUserDetails, updateProfile, updateAvatar, addFriend, allUsers };