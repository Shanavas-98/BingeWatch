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
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ success: false, message: 'TokenExpiredError' });
        }
        res.json({ success: false, message: 'Admin unauthorised' });
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

const getUsersOfMonth = async(month,year)=>{
    try {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const usersCount = await userModel
            .find({
                createdAt: {
                    $gte: firstDay,
                    $lte: lastDay
                }
            })
            .countDocuments().exec();
        return usersCount;
    } catch (error) {
        return (error.message);
    }
};

const getUserGrowth = async (req, res) => {
    try {
        const today = new Date();
        const month = today.getMonth();
        const year = today.getFullYear();
        const newUsers = await getUsersOfMonth(month, year);
        const lastMonthUsers = await getUsersOfMonth(month-1, year);
        const diff = newUsers - lastMonthUsers;
        const profit = diff > 0 ? true : false ;
        let growth;
        if(lastMonthUsers>0){
            growth = (Math.abs(diff)/lastMonthUsers)*100;
        }else{
            growth = Math.abs(diff)*100;
        }
        res.json({newUsers,growth,profit});
    } catch (error) {
        res.json(error.message);
    }
};

const getUsersOfYear = async(req,res)=>{
    try {
        const today = new Date();
        const currMonth = today.getMonth();
        const currYear = today.getFullYear();
        const months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'June',
            'July',
            'Aug',
            'Sept',
            'Oct',
            'Nov',
            'Dec',
        ];
        const monthlyUsers = {};
        for(let i=currMonth; i>=0; i--){
            const userCount = await getUsersOfMonth(i, currYear);
            monthlyUsers[months[i]] = userCount;
        }
        for (let i = 11; i > currMonth; i -= 1) {
            const userCount = await getUsersOfMonth(i, currYear-1);
            monthlyUsers[months[i]] = userCount;
        }
        res.json(monthlyUsers);
    } catch (error) {
        res.json(error.message);
    }
};

const getUserCounts = async(req,res)=>{
    try {
        const total = await userModel.find().countDocuments().exec();
        const blocked = await userModel.find({blocked:true}).countDocuments().exec();
        const active = total-blocked;
        res.json({total,blocked,active});
    } catch (error) {
        res.json(error.message);
    }
};

module.exports = { login, adminAuth, fetchUsers, blockUser, getUserGrowth, getUserCounts, getUsersOfYear };