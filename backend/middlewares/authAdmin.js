const jwt = require('jsonwebtoken');
const adminModel = require('../models/adminModel');

module.exports = async (req, res, next) => {
    try {
        console.log('admin token', req.headers.authorization);
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
            req.adminId=admin._id;
            next();
        }else{
            res.json({ success:false, message: 'Middleware: Admin unauthorized' });
        }
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: 'Middleware: Admin unauthorized' });
    }
};
