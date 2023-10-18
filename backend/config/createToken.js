const jwt = require('jsonwebtoken');
const maxAge = 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_KEY, {
        expiresIn: maxAge
    });
};

module.exports = createToken;