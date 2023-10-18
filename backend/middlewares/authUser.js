const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

module.exports = async (req, res, next) => {
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            let token=req.headers.authorization.split(' ')[1];
            if(!token || token==='null'){
                return res.json({ success: false, message: 'User token required' });
            }
            const decoded = jwt.verify(token,process.env.JWT_KEY);
            const user = await userModel.findById(decoded.id).select('-password');
            if(!user){
                return res.json({ success: false, message: 'User not exists' });
            }
            if(user.blocked){
                return res.json({ success: false, message: 'User temporarily blocked' });
            }
            req.userId=user?._id;
            next();
        }else{
            res.json({ success:false, message: 'Middleware: User unauthorized' });
        }
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ success: false, message: 'TokenExpiredError' });
        }else{
            res.json({ success: false, message: 'Middleware: User unauthorized' });
        }
    }
};
