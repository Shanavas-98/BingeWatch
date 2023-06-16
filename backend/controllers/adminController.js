
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;
const adminModel = require("../models/adminModel");


const createToken = (id) => {
    // eslint-disable-next-line no-undef
    return jwt.sign({ id }, process.env.JWT_KEY, {
        expiresIn: maxAge
    });
};

const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const admin = await adminModel.findOne({email});
        if(!admin){
            throw Error("admin email doesn't exist");
        }
        const auth = await bcrypt.compare(password,admin.password);
        if(!auth){
            throw Error("wrong password");
        }
        const token = createToken(admin._id);
        res.json({admin,token});
    }catch(error){
        res.json({error});
    }
};

const adminAuth = async (req, res) => {
    try {
        //verify user authentication
        const { authorization } = req.headers;
        if (!authorization) {
            return res.json({ error: "Authorization token required" });
        }

        const token = authorization.split(" ")[1];
        // eslint-disable-next-line no-undef
        jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
            if (err) {
                res.json({ status: false, message: "Unauthorized" });
            } else {
                const user = await adminModel.findOne({ _id: decoded.id });
                if (user) {
                    res.json({user,status:true,message:"Authorised"});
                } else {
                    res.json({ status: false, message: "User not exists" });
                }
            }
        });
    } catch (err) {
        res.json({ error: "Request is not authorized" });
    }
};

const dashboard = async(req,res)=>{
    try{
        console.log(req.body);
    }catch(error){
        res.json({error});
    }
};

module.exports = {login,adminAuth,dashboard};