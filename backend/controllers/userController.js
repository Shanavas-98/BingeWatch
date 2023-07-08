/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const maxAge = 3 * 24 * 60 * 60;
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const verifySid = process.env.TWILIO_VERIFY;
const client = require('twilio')(accountSid, authToken);
const bcrypt = require('bcrypt');

let newUser;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_KEY, {
        expiresIn: maxAge
    });
};

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
                        const token = await createToken(user._id);
                        return res.json({ status: true, message: 'Verification successfull', token });
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
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            throw Error('wrong password');
        }
        if(user.blocked){
            throw Error('user is temporarily blocked');
        }
        const token = createToken(user._id);
        res.json({ user, token });

    } catch (error) {
        res.json({ error });
    }
};

const userAuth = async (req, res) => {
    try {
        //verify user authentication
        const { authorization } = req.headers;
        if (!authorization) {
            return res.json({ success: false, message: 'authorization token required' });
        }

        const token = authorization.split(' ')[1];
        // eslint-disable-next-line no-undef
        jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
            if (err) {
                return res.json({ success: false, message: 'Unauthorized user' });
            } else {
                const user = await userModel.findOne({ _id: decoded.id });
                if (user) {
                    return res.json({ success: true, message: 'Authorised', user });
                } else {
                    return res.json({ success: false, message: 'User not exists' });
                }
            }
        });
    } catch (err) {
        res.json({ error: 'Request is not authorized' });
    }
};

const home = async (req, res) => {
    try {
        console.log(req.body);
    } catch (error) {
        res.json(error);
    }
};

// const movies = async(req,res)=>{
//     try{

//     }
// }

module.exports = { register, verifyOtp, login, home, userAuth };