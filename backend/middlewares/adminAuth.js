const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        //verify user authentication
        const { authorization } = req.headers
        if (!authorization) {
            return res.json({ error: "Authorization token required" })
        }

        const token = authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
            if (err) {
                res.json({ status: false, message: "Unauthorized" });
            } else {
                const admin = await adminModel.findOne({ _id: decoded.id });
                if (admin) {
                    next();
                } else {
                    res.json({ status: false, message: "Admin not exists" })
                }
            }
        })

    } catch (err) {
        console.log(err);
        res.json({ error: "Request is not authorized" })
    }
}