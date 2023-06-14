const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const maxAge = 3 * 24 * 60 * 60;
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const verifySid = process.env.TWILIO_VERIFY;
const client = require("twilio")(accountSid, authToken);
const bcrypt = require("bcrypt")

let newUser;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_KEY, {
        expiresIn: maxAge
    })
}

const register = async (req, res, next) => {
    try {
        const { email, mobile } = req.body;
        const isEmail = await userModel.findOne({ email: email })
        if (isEmail) {
            return res.json({ message: "user email already exists", status: false })
        }
        const isMobile = await userModel.findOne({ mobile: mobile })
        if (isMobile) {
            return res.json({ message: "user mobile already exists", status: false })
        }

        newUser = req.body;

        client.verify.v2
            .services(verifySid)
            .verifications.create({ to: `+91${mobile}`, channel: "sms" })
        res.json({ status: true })
    } catch (error) {
        res.json(error)
    }

}

const verifyOtp = async (req, res, next) => {
    const otpCode = req.body.otp
    client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to: `+91${newUser.mobile}`, code: otpCode })
        .then(async (verification_check) => {
            if (verification_check.status === 'pending') {
                return res.json({ status: false, message: "The OTP is invalid" })
            }
            if (verification_check.status === 'approved') {
                await userModel({
                    fullName: newUser.fullName,
                    email: newUser.email,
                    mobile: newUser.mobile,
                    password: newUser.password,
                    verified: true
                }).save()
                    .then(async(user) => {
                        console.log("database",user);
                        const token =await createToken(user._id);
                        return res.json({ status: true, message: "Verification successfull", token })
                    })
            }
            if (verification_check.status === 429) {
                return res.json({ status: false, message: "Max check attempts reached" })
            }
        })
}

const login = async (req, res, next) => {
    console.log(req.body);
    try {
        const {email,password}=req.body;
        const user = await userModel.findOne({email});
        if(!user){
            throw Error("incorrect email")
        }
        const auth = await bcrypt.compare(password,user.password)
        if(!auth){
            throw Error("wrong password")
        }
        const token = createToken(user._id);
        res.json({user,token,created:true})
        
    } catch (error) {
        res.json({error,created:false})
    }
}

const home = async (req, res, next) => {
    console.log(req.body);
}

module.exports = { register, verifyOtp, login, home }