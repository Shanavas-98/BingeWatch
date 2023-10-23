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
const requestModel = require('../models/requestModel');

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

const resendOtp = async (req, res) => {
    try {
        client.verify.v2
            .services(verifySid)
            .verifications.create({ to: `+91${newUser.mobile}`, channel: 'sms' });
        res.json({ success: true, message: 'otp send successfully' });
    } catch (error) {
        res.json({ success: false, message: error.message });
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
                        const userData = { id: user?._id, name: user?.fullName, email: user?.email, token: token };
                        return res.json({ status: true, message: 'Verification successfull', userData });
                    });
            }
            if (verification_check.status === 429) {
                return res.json({ status: false, message: 'Max check attempts reached' });
            }
        });
};

const forgotOtp = async (req, res) => {
    try {
        client.verify.v2
            .services(verifySid)
            .verifications.create({ to: `+91${req.body.mobile}`, channel: 'sms' });
        res.json({ success: true, message: 'otp send successfully' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const forgotPassword = async (req, res) => {
    try {
        client.verify.v2
            .services(verifySid)
            .verificationChecks.create({ to: `+91${req.body.mobile}`, code: req.body.otp })
            .then(async (verification_check) => {
                if (verification_check.status === 'pending') {
                    return res.json({ success: false, message: 'The OTP is invalid' });
                }
                if (verification_check.status === 'approved') {
                    const salt = await bcrypt.genSalt();
                    await userModel.findOneAndUpdate({ mobile: req.body.mobile },
                        {
                            $set: {
                                password: await bcrypt.hash(req.body.newPass, salt)
                            }
                        })
                        .then(() => {
                            res.json({ success: true, message: 'Password changed successfully' });
                        }).catch(() => {
                            res.json({ success: false, message: 'something went wrong' });
                        });
                }
                if (verification_check.status === 429) {
                    return res.json({ success: false, message: 'Max check attempts reached' });
                }
            });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
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
        if (user?.blocked) {
            throw Error('user is temporarily blocked');
        }
        const token = await createToken(user?._id);
        const userData = {
            id: user?._id,
            name: user?.fullName,
            email: user?.email,
            picture: user?.picture?.url,
            blocked: user?.blocked,
            token
        };
        res.json({ ...userData });
    } catch (error) {
        res.json({ error: error.message });
    }
};

const userAuth = async (req, res) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            let token = req.headers.authorization.split(' ')[1];
            if (!token || token === 'null') {
                return res.json({ success: false, message: 'User token required' });
            }
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            const user = await userModel.findById(decoded.id).select('-password');
            if (!user) {
                return res.json({ success: false, message: 'User not exists' });
            }
            const userData = {
                id: user?._id,
                name: user?.fullName,
                email: user?.email,
                picture: user?.picture?.url,
                blocked: user?.blocked,
                token
            };
            return res.json({ success: true, message: 'User authorised', userData });
        } else {
            return res.json({ success: false, message: 'User unauthorized' });
        }
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'TokenExpiredError' });
        } else {
            return res.json({ success: false, message: 'User unauthorized' });
        }
    }
};

const fetchUserWatchlist = async (req, res) => {
    try {
        const userId = req.userId;
        const watchlist = await watchlistModel
            .find({ user: userId })
            .populate('movies')
            .populate('series')
            .exec();
        res.json(watchlist);
    } catch (error) {
        res.json(error);
    }
};

const fetchUserDetails = async (req, res) => {
    try {
        const userId = req.userId;
        const userData = await userModel.findOne({ _id: userId }, { password: 0 });
        res.json(userData);
    } catch (error) {
        res.json(error);
    }
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const { fullName } = req.body;
        if (!fullName) {
            throw Error('all fields required');
        }
        await userModel.updateOne({ _id: userId }, {
            $set: {
                fullName
            }
        }).then(() => {
            res.json({ success: true, message: 'profile updated successfully' });
        }).catch(() => {
            res.json({ success: false, message: 'something went wrong' });
        });
    } catch (error) {
        res.json(error);
    }
};

const updateAvatar = async (req, res) => {
    try {
        const { filename, path } = req.file;
        await userModel.updateOne({ _id: req.userId }, {
            $set: {
                picture: { file: filename, url: path }
            }
        }).then(() => {
            res.json({ status: true, message: 'Profile updated successfully' });
        }).catch(() => {
            res.json({ status: false, message: 'something went wrong' });
        });
    } catch (error) {
        res.json(error);
    }
};

// /users?search='username'
const allFriends = async (req, res) => {
    try {
        const search = req.query?.search?.trim().toLowerCase() || '';
        const userId = req.userId;
        const user = await userModel.findById(userId).populate({ path: 'friends', select: '_id fullName picture email' });
        console.log(user);
        const filteredFriends = user?.friends?.filter((friend) => {
            return (
                friend?.fullName?.toLowerCase().includes(search) ||
                friend?.email?.toLowerCase().includes(search)
            );
        });
        res.json(filteredFriends);
    } catch (error) {
        console.error('Error all friends:', error.message);
    }
};

const addFriend = async (req, res) => {
    try {
        const friendId = req.params.friendId;
        const isFriend = await userModel.findOne({ $and: [{ _id: req.userId }, { friends: friendId }] });
        if (isFriend) {
            return res.json({ success: false, message: 'user already your friend' });
        }
        const isRequest = await requestModel.findOne({
            $or: [
                {
                    $and: [
                        { user: friendId },
                        { friend: req.userId },
                        { status: 'pending' }
                    ]
                },
                {
                    $and: [
                        { user: req.userId },
                        { friend: friendId },
                        { status: 'pending' }
                    ]
                }
            ]
        });
        if (isRequest) {
            return res.json({ success: false, message: 'friend request already exist' });
        }
        const request = await new requestModel({
            user: req.userId,
            friend: friendId
        }).save();
        console.log(request);
        return res.json({ success: true, message: 'Friend request send successfully' });
    } catch (error) {
        res.json(error);
    }
};

const getRequests = async (req, res) => {
    try {
        const send = await requestModel.find({ $and: [{ user: req.userId }, { status: 'pending' }] })
            .populate({
                path: 'friend',
                select: '_id picture fullName',
            }).exec();
        const recieved = await requestModel.find({ $and: [{ friend: req.userId }, { status: 'pending' }] })
            .populate({
                path: 'user',
                select: '_id picture fullName',
            }).exec();
        res.json({ send, recieved });
    } catch (error) {
        res.json(error);
    }
};

const cancelFriend = async (req, res) => {
    try {
        const reqId = req.params.reqId;
        const result = await requestModel.deleteOne({ _id: reqId });
        if (result.deletedCount === 1) {
            res.json({ success: true, message: 'Friend request canceled' });
        } else {
            res.json({ success: false, message: 'Friend request not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const acceptFriend = async (req, res) => {
    try {
        const reqId = req.params.reqId;
        const request = await requestModel.findByIdAndUpdate(reqId, { status: 'accepted' });
        await userModel.findByIdAndUpdate(request.user,
            { $push: { friends: request.friend } },
            { new: true });
        await userModel.findByIdAndUpdate(request.friend,
            { $push: { friends: request.user } },
            { new: true });
        res.json({ success: true, message: 'friend request accepted' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const rejectFriend = async (req, res) => {
    try {
        const reqId = req.params.reqId;
        const result = await requestModel.findByIdAndUpdate(reqId, { status: 'rejected' });
        if (result) {
            res.json({ success: true, message: 'Friend request rejected' });
        } else {
            res.json({ success: false, message: 'Friend request not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const unfriend = async(req,res)=>{
    try {
        const friendId = req.params.friendId;
        const result = await userModel.findByIdAndUpdate(req.userId,{$pull:{friends:friendId}});
        if (result) {
            res.json({ success: true, message: 'Unfriend successfull' });
        } else {
            res.json({ success: false, message: 'Friend not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


module.exports = {
    register,
    resendOtp,
    verifyOtp,
    forgotOtp,
    forgotPassword,
    login,
    userAuth,
    fetchUserWatchlist,
    fetchUserDetails,
    updateProfile,
    updateAvatar,
    addFriend,
    allFriends,
    getRequests,
    cancelFriend,
    acceptFriend,
    rejectFriend,
    unfriend
};