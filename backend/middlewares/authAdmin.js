const jwt = require('jsonwebtoken');
const adminModel = require('../models/adminModel');

module.exports = async (req, res, next) => {
    try {
        //verify user authentication
        console.log('admin auth middleware');
        const { authorization } = req.headers;
        if (!authorization) {
            return res.json({ error: 'Authorization token required' });
        }

        const token = authorization.split(' ')[1];
        // eslint-disable-next-line no-undef
        jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
            if (err) {
                res.json({ success: false, message: 'Admin unauthorized' });
            } else {
                // eslint-disable-next-line no-undef
                const admin = await adminModel.findOne({ _id: decoded.id });
                if (admin) {
                    req.adminId=admin._id;
                    next();
                } else {
                    res.json({ success: false, message: 'Admin not exists' });
                }
            }
        });

    } catch (err) {
        console.log(err);
        res.json({ error: 'Request is not authorized' });
    }
};