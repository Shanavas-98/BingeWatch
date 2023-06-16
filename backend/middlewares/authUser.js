const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
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
                const user = await userModel.findOne({ _id: decoded.id });
                if (user) {
                    req.userId = user._id;
                    next();
                } else {
                    res.json({ status: false, message: "User not exists" });
                }
            }
        });

    } catch (err) {
        console.log(err);
        res.json({ error: "Request is not authorized" });
    }
};