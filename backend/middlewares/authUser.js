const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

module.exports = async (req, res, next) => {
    try {
        //verify user authentication
        console.log('Headers',req.headers);
        const { authorization } = req.headers;
        if (!authorization) {
            return res.json({ error: 'Authorization token required' });
        }

        const token = authorization.split(' ')[1];
        // eslint-disable-next-line no-undef
        jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
            if (err) {
                console.log('error',err);
                res.json({ success: false, message: 'Middleware:User unauthorized' });
            } else {
                const user = await userModel.findOne({ _id: decoded.id });
                if (user) {
                    req.userId = user._id;
                    next();
                } else {
                    res.json({ success: false, message: 'User not exists' });
                }
            }
        });

    } catch (err) {
        console.error(err);
        res.json({ error: 'Request is not authorized' });
    }
};