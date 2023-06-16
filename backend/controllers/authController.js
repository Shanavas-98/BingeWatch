const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");
const maxAge = 3*24*60*60;
const User = require("../models/userModel");

const createToken = (id) => {
    // eslint-disable-next-line no-undef
    return jwt.sign({ _id: id }, process.env.JWT_KEY, { expiresIn: maxAge });
};