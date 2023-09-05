const chatModel = require('../models/chatModel');
const messageModel = require('../models/messageModel');
const userModel = require('../models/userModel');

const sendMessage = async(req,res)=>{
    try {
        const {chatId,content}=req.body;
        if(!content || !chatId){
            console.log('Invalid message or chat');
            res.sendStatus(400);
        }
        let newMsg={
            sender:req.userId,
            chat: chatId,
            content: content
        };
        let message = await messageModel.create(newMsg);
        await message.populate('sender','name picture');
        await message.populate('chat');
        let messageData = await userModel.populate(message,{
            path:'chat.users',
            select:'name email picture'
        });
        await chatModel.findByIdAndUpdate(req.body.chatId,{
            latestMsg: messageData
        });
        res.json(messageData);
    } catch (error) {
        console.error('Error:',error.message);
        res.status(400);
        throw new Error(error.message);
    }
};

const allMessages = async(req,res)=>{
    try {
        const chatId = req.params.chatId;
        console.log('chat id',chatId);
        const messages = await messageModel
            .find({chat:chatId})
            .populate('sender','name pic email')
            .populate('chat')
            .exec();
        res.json(messages);
    } catch (error) {
        console.error('Error allMessages:',error.message);
        res.status(400);
        throw new Error(error.message);
    }
};

module.exports = {sendMessage,allMessages};