
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const maxAge = 3 * 24 * 60 * 60;
const adminModel = require('../models/adminModel');
const userModel = require('../models/userModel');


const createToken = (id) => {
    // eslint-disable-next-line no-undef
    return jwt.sign({ id }, process.env.JWT_KEY, {
        expiresIn: maxAge
    });
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await adminModel.findOne({ email });
        if (!admin) {
            throw Error('admin email doesnot exist');
        }
        const auth = await bcrypt.compare(password, admin.password);
        if (!auth) {
            throw Error('wrong password');
        }
        const token = createToken(admin._id);
        res.json({ admin, token });
    } catch (error) {
        res.json({ error });
    }
};

const adminAuth = async (req, res) => {
    try {
        //verify user authentication
        const { authorization } = req.headers;
        if (!authorization) {
            return res.json({ success:false, message: 'Authorization token required' });
        }

        const token = authorization.split(' ')[1];
        // eslint-disable-next-line no-undef
        jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
            if (err) {
                res.json({ success: false, message: 'Admin unauthorized' });
            } else {
                const admin = await adminModel.findById({ _id: decoded.id });
                if (admin) {
                    res.json({ success: true, message: 'Authorised', admin, token });
                } else {
                    res.json({ success: false, message: 'Admin not exists' });
                }
            }
        });
    } catch (err) {
        res.json({ error: 'Request is not authorized' });
    }
};

const dashboard = async (req, res) => {
    try {
        // console.log(req.body);
    } catch (error) {
        res.json({ error });
    }
};

const fetchUsers = async(req,res)=>{
    try {
        const users = await userModel.find().lean();
        res.json(users);
    } catch (err) {
        res.json(err);
    }
};

const blockUser = async(req,res)=>{
    try{
        const userId = req.params.userId;
        const user = await userModel.findOne({_id: userId});
        user.blocked = !user.blocked;
        await user.save()
            .then(()=>{
                res.json({success:true, block:user.blocked});
            })
            .catch((err)=>{
                throw Error('error while blocking user',err);
            });
    }catch(err){
        res.json(err);
    }
};

module.exports = { login, dashboard, adminAuth, fetchUsers, blockUser };