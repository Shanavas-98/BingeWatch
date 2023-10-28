const jwt = require('jsonwebtoken');
const createToken = (id, expiry) => {
    return jwt.sign({ id }, process.env.JWT_KEY, {
        expiresIn: expiry
    });
};

module.exports = createToken;