const express = require('express');
const authUser = require('../middlewares/authUser');
const { sendMessage, allMessages } = require('../controllers/messageController');
const msg_router = express.Router();

msg_router.route('/').post(authUser,sendMessage);
msg_router.route('/:chatId').get(authUser,allMessages);

module.exports = msg_router;