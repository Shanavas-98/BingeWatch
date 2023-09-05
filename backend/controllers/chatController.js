const chatModel = require('../models/chatModel');
const userModel = require('../models/userModel');

const createChat = async (req, res) => {
    try {
        const { friendId } = req.body;
        const userId = req.userId;
        if (!friendId) {
            return res.sendStatus(400);
        }
        let isChat = await chatModel.find({
            isGroup: false,
            $and: [
                { users: { $elemMatch: { $eq: userId } } },
                { users: { $elemMatch: { $eq: friendId } } },
            ]
        }).populate('users', '-password')
            .populate('latestMsg');
        isChat = await userModel.populate(isChat, {
            path: 'latestMsg.sender',
            select: 'name picture email'
        });
        if (isChat.length > 0) {
            // console.log('ischat',isChat);
            res.json(isChat[0]);
        } else {
            let chatData = {
                chatName: 'sender',
                isGroup: false,
                users: [userId, friendId]
            };
            const createdChat = await chatModel.create(chatData);
            // console.log('chat data',createdChat);
            const fullChat = await chatModel.findOne({ _id: createdChat._id })
                .populate('users', '-password');
            res.status(200).json(fullChat);
        }
    } catch (error) {
        console.error('Error createChat:', error.message);
    }
};

const fetchChats = async (req, res) => {
    try {
        await chatModel.find({ users: { $elemMatch: { $eq: req.userId } } })
            .populate('users', '-password')
            .populate('groupAdmin', '-password')
            .populate('latestMsg')
            .sort({ updatedAt: -1 })
            .then(async (result) => {
                let chats = await userModel.populate(result, {
                    path: 'latestMsg.sender',
                    select: 'name picture email'
                });
                res.status(200).json(chats);
            });
    } catch (error) {
        console.error('Error fetchChats:', error.message);
    }
};

const createGroup = async (req, res) => {
    try {
        const groupName = req.body.name;
        const usersArr = req.body.users;

        if (!groupName || !usersArr) {
            return res.status(400).send({ message: 'please fill all the fields' });
        }        
        let users = JSON.parse(usersArr);
        if (users.length < 2) {
            return res.status(400)
                .send('More than two users required to form a group chat');
        }
        users.push(req.userId);

        const groupChat = await chatModel.create({
            chatName: groupName,
            isGroup: true,
            users: users,
            groupAdmin: req.userId
        });
        const fullGroupChat = await chatModel.findOne({_id: groupChat._id})
            .populate('users','-password')
            .populate('groupAdmin','-password');
        res.status(200).json(fullGroupChat);
    } catch (error) {
        console.error('Error createGroup:', error.message);
    }
};

const renameGroup = async(req,res)=>{
    try {
        const {chatId,chatName} = req.body;
        const updatedChat = await chatModel.findByIdAndUpdate(
            chatId,
            {chatName},
            {new:true}
        )
            .populate('users','-password')
            .populate('groupAdmin','-password');
        if(!updatedChat){
            res.status(404);
            throw new Error('Chat not found');
        }else{
            res.json(updatedChat);
        }
    } catch (error) {
        console.error('Error renameGroup',error.message);
    }
};

const addToGroup = async(req,res)=>{
    try {
        const {chatId, friendId}=req.body;
        const added = await chatModel.findByIdAndUpdate(
            chatId,
            {$push:{users:friendId}},
            {new:true}
        ).populate('users','-password')
            .populate('groupAdmin','-password');
        if(!added){
            res.status(404);
            throw new Error('Chat not found');
        }else{
            res.json(added);
        }
    } catch (error) {
        console.error('Error addToGroup:', error.message);
    }
};

const removeFromGroup = async(req,res)=>{
    try {
        const {chatId, friendId}=req.body;
        const removed = await chatModel.findByIdAndUpdate(
            chatId,
            {$pull:{users:friendId}},
            {new:true}
        ).populate('users','-password')
            .populate('groupAdmin','-password');

        if(!removed){
            res.status(404);
            throw new Error('Chat not found');
        }else{
            res.json(removed);
        }        
    } catch (error) {
        console.error('Error removeFromGroup',error.message);
    }
};

module.exports = { createChat, fetchChats, createGroup, renameGroup, addToGroup, removeFromGroup };