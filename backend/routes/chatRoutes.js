const express = require('express');
const { createChat, fetchChats, createGroup, renameGroup, addToGroup, removeFromGroup } = require('../controllers/chatController');
const authUser = require('../middlewares/authUser');
const chat_router=express.Router();

chat_router.route('/').post(authUser,createChat).get(authUser,fetchChats);
chat_router.route('/group').post(authUser,createGroup);
chat_router.route('/rename').put(authUser,renameGroup);
chat_router.route('/add').put(authUser,addToGroup);
chat_router.route('/remove').put(authUser,removeFromGroup);

module.exports = chat_router;