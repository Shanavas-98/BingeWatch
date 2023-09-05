
const bcrypt = require('bcrypt');
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
        const token = createToken(admin._id);
        res.json({ id:admin._id,email:admin.email, token });
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
                const admin = await adminModel.findById(decoded.id,{password:0});
                const adminData = {id:admin._id,email:admin.email,token};
                if (admin) {
                    res.json({ success: true, message: 'Authorised', adminData });
                } else {
                    res.json({ success: false, message: 'Admin not exists' });
                }
            }
        });
    } catch (err) {
        res.json({ success: false, message: 'error while admin authorization',err });
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