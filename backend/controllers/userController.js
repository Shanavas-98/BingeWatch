/* eslint-disable no-undef */
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const verifySid = process.env.TWILIO_VERIFY;
const client = require('twilio')(accountSid, authToken);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const watchlistModel = require('../models/watchlistModel');
const userModel = require('../models/userModel');
const requestModel = require('../models/requestModel');
const tokenModel = require('../models/tokenModel');
const createToken = require('../config/createToken');
const sendEmail = require('../utils/sendEmail');

// let newUser;

const sendOtp = (mobile) => {
    try {
        client.verify.v2
            .services(verifySid)
            .verifications.create({ to: `+91${mobile}`, channel: 'sms' });
        return true;
    } catch (error) {
        return false;
    }
};

const sendVerifyLink = async (email, userId) => {
    try {
        const expiry = 60 * 60;
        const token = createToken(userId, expiry);
        const jwtToken = await new tokenModel({
            user: userId,
            token: token
        }).save();
        const url = `${process.env.CLIENT_URL}/verify-email/${jwtToken.token}`;
        const subject = 'Email Verification Link';
        const text = `Welcome to Binge Watch. Click this link to verify your email ${url}. This link will expire in one hour`;
        const result = await sendEmail(email, subject, text);
        return result;
    } catch (error) {
        return false;
    }
};

const register = async (req, res) => {
    try {
        const { fullName, email, mobile, password } = req.body;
        const isEmail = await userModel.findOne({ email: email });
        if (isEmail) {
            return res.json({ message: 'user email already exists', status: false });
        }
        const isMobile = await userModel.findOne({ mobile: mobile });
        if (isMobile) {
            return res.json({ message: 'user mobile already exists', status: false });
        }
        const user = await new userModel({
            fullName,
            email,
            mobile,
            password,
        }).save();
        // newUser = req.body;
        const otpSend = sendOtp(user?.mobile);
        const linkSend = await sendVerifyLink(user?.email, user?._id);
        res.json({ mobile: user?.mobile, otp: otpSend, link: linkSend });
        // client.verify.v2
        //     .services(verifySid)
        //     .verifications.create({ to: `+91${mobile}`, channel: 'sms' });
    } catch (error) {
        res.json(error);
    }

};

const resendOtp = async (req, res) => {
    try {
        const otpSend = sendOtp(req.body?.mobile);
        if (otpSend) {
            res.json({ success: true, message: 'otp send successfully' });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const verifyOtp = async (mobile, otp) => {
    try {
        const verification = await client.verify.v2
            .services(verifySid)
            .verificationChecks.create({ to: `+91${mobile}`, code: otp });
        return String(verification.status);
    } catch (error) {
        return null;
    }
};

const verifyOtpSend = async (req, res) => {
    try {
        const otp = req.body.otp;
        const mobile = req.body.mobile;
        const status = await verifyOtp(mobile, otp);
        if (status === 'pending') {
            return res.json({ status: false, message: 'Invalid OTP' });
        }
        if (status === 'approved') {
            const user = await userModel.updateOne({ mobile: mobile }, {
                $set: {
                    mobileVerified: true
                }
            });
            if (user) {
                return res.json({ status: true, message: 'mobile verified successfully' });
            } else {
                return res.json({ status: false, message: 'User not found!' });
            }
            // const token = await createToken(user?._id);
            // const userData = { id: user?._id, name: user?.fullName, email: user?.email, token: token };
        }
        if (status === 429) {
            return res.json({ status: false, message: 'Max check attempts reached' });
        }
    } catch (error) {
        console.log(error);
    }
};

const forgotPassword = async (req, res) => {
    try {
        const mobile = req.body.mobile;
        const otp = req.body.otp;
        const status = await verifyOtp(mobile, otp);
        if (status === 'pending') {
            return res.json({ success: false, message: 'Invalid OTP!' });
        }
        if (status === 'approved') {
            const salt = await bcrypt.genSalt();
            const user = await userModel.findOneAndUpdate({ mobile: mobile },
                {
                    $set: {
                        password: await bcrypt.hash(req.body.newPass, salt),
                        mobileVerified: true
                    }
                });
            if (user) {
                res.json({ success: true, message: 'Password changed successfully' });
            } else {
                res.json({ success: false, message: 'User not found' });
            }
        }
        if (status === 429) {
            return res.json({ success: false, message: 'Max check attempts reached' });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const resendLink = async (req, res) => {
    try {
        const linkSend = await sendVerifyLink(req.body.email, req.userId);
        res.json({ success: linkSend });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const token = req.params.token;
        if (!token || token === 'null') {
            throw Error('Verification token required');
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp && now > decoded.exp) {
            throw Error('Verification link expired');
        }
        const verify = await tokenModel.findOne({ $and: [{ user: decoded.id }, { token: token }] });
        if (verify) {
            await userModel.updateOne({ _id: decoded.id }, {
                $set: { emailVerified: true }
            });
            return res.json({ success: true, message: 'Email verified successfully' });
        }
    } catch (error) {
        return res.json({ success: false, message: error.message });
    } finally {
        await tokenModel.deleteOne({ token: req.params.token });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            throw Error('incorrect email');
        }
        if (!user?.emailVerified) {
            const linkSend = sendVerifyLink(user?.email, user?._id);
            if (linkSend) {
                throw Error('email not verified. click on the link send to your email');
            }
        }
        const auth = await bcrypt.compare(password, user?.password);
        if (!auth) {
            throw Error('wrong password');
        }
        if (user?.blocked) {
            throw Error('user is temporarily blocked');
        }
        const expiry = 24 * 60 * 60;
        const token = createToken(user?._id, expiry);
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

const updateName = async (req, res) => {
    try {
        const userId = req.userId;
        const { name } = req.body;
        if (!name) {
            throw Error('name is required');
        }
        const user = await userModel.updateOne({ _id: userId }, {
            $set: {
                fullName: name
            }
        });
        if (!user) {
            return res.json({ success: false, message: 'user not found' });
        }
        return res.json({ success: true, message: 'Name updated successfully' });
    } catch (error) {
        res.json(error);
    }
};

const updateAvatar = async (req, res) => {
    try {
        const { filename, path } = req.file;
        const user = await userModel.updateOne({ _id: req.userId }, {
            $set: {
                picture: { file: filename, url: path }
            }
        });
        if (!user) {
            return res.json({ success: false, message: 'user not found' });
        }
        return res.json({ status: true, message: 'Picture updated successfully' });
    } catch (error) {
        res.json(error);
    }
};

const updateEmail = async (req, res) => {
    try {
        const userId = req.userId;
        const { email } = req.body;
        if (!email) {
            throw Error('email is required');
        }
        const exist = await userModel.findOne({ email: email });
        if (exist._id === userId) {
            throw Error('email already linked to your account');
        }
        if (exist) {
            throw Error('email already linked to another account');
        }
        const user = await userModel.updateOne({ _id: userId }, {
            $set: {
                email: email,
                emailVerified: false
            }
        });
        if (!user) {
            return res.json({ success: false, message: 'user not found' });
        }
        const linkSend = await sendVerifyLink(user?.email, user?._id);
        return res.json({ success: true, link: linkSend, message: 'email updated successfully' });
    } catch (error) {
        res.json(error);
    }
};

const updateMobile = async (req, res) => {
    try {
        const userId = req.userId;
        const { mobile } = req.body;
        if (!mobile) {
            throw Error('mobile is required');
        }
        const exist = await userModel.findOne({ mobile: mobile });
        if (exist._id === userId) {
            throw Error('mobile already linked to your account');
        }
        if (exist) {
            throw Error('mobile already linked to another account');
        }
        const user = await userModel.updateOne({ _id: userId }, {
            $set: {
                mobile: mobile,
                mobileVerified: false
            }
        });
        if (!user) {
            return res.json({ success: false, message: 'user not found' });
        }
        const otpSend = sendOtp(user?.mobile);
        return res.json({ success: true, otp: otpSend, message: 'mobile updated successfully' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// /users?search='username'
const allFriends = async (req, res) => {
    try {
        const search = req.query?.search?.trim().toLowerCase() || '';
        const userId = req.userId;
        const user = await userModel.findById(userId, { _id: 1, friends: 1 })
            .populate({ path: 'friends', select: '_id fullName picture email' });
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
        await new requestModel({
            user: req.userId,
            friend: friendId
        }).save();
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

const unfriend = async (req, res) => {
    try {
        const friendId = req.params.friendId;
        await userModel.findByIdAndUpdate(req.userId,
            { $pull: { friends: friendId } });
        await userModel.findByIdAndUpdate(friendId,
            { $pull: { friends: req.userId } });
        res.json({ success: true, message: 'Unfriend successfull' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


module.exports = {
    register,
    resendOtp,
    verifyOtpSend,
    sendVerifyLink,
    resendLink,
    verifyEmail,
    forgotPassword,
    login,
    userAuth,
    fetchUserWatchlist,
    fetchUserDetails,
    updateAvatar,
    updateName,
    updateEmail,
    updateMobile,
    addFriend,
    allFriends,
    getRequests,
    cancelFriend,
    acceptFriend,
    rejectFriend,
    unfriend
};