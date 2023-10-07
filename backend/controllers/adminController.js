const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminModel = require('../models/adminModel');
const userModel = require('../models/userModel');
const createToken = require('../config/createToken');

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
        const token = await createToken(admin._id);
        res.json({ id:admin._id,email:admin.email, token });
    } catch (error) {
        res.json({ error: error.message });
    }
};

const adminAuth = async (req, res) => {
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            let token=req.headers.authorization.split(' ')[1];
            if(!token || token==='null'){
                return res.json({ success: false, message: 'Admin token required' });
            }
            const decoded = jwt.verify(token,process.env.JWT_KEY);
            const admin = await adminModel.findById(decoded.id).select('-password');
            if(!admin){
                return res.json({ success: false, message: 'Admin not exists' });
            }
            const adminData = {id:admin._id,email:admin.email,token};
            res.json({ success: true, message: 'Admin authorised', adminData });
        }else{
            res.json({ success: false, message: 'Admin unauthorised' });
        }
    } catch (err) {
        console.log('error',err);
        res.json({ success: false, message: 'Admin unauthorised' });
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
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const start = (page - 1) * limit;
        const end = page * limit;
        const search = req.query.search;
        const field = req.query.field;
        const order = JSON.parse(req.query.order);
        const sortObj = {};
        sortObj[field] = (order ? 1 : -1);
        const count = await userModel
            .find({fullName: { $regex: search, $options: 'i' }})
            .countDocuments()
            .exec();
        const users = await userModel
            .find({fullName: { $regex: search, $options: 'i' }})
            .sort(sortObj)
            .skip(start)
            .limit(limit)
            .exec();
        const pagination = {};
        pagination.current = page;
        pagination.limit = limit;
        if (start > 0) {
            pagination.previous = page - 1;
        }
        if (end < count) {
            pagination.next = page + 1;
        }
        res.json({ users, pagination });
    } catch (err) {
        res.json(err.message);
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