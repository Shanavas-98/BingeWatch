/* eslint-disable no-undef */
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
// const mongoose = require('mongoose');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const path = require('path');
const userRoute = require('./routes/userRouter');
const adminRoute = require('./routes/adminRouter');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const connectDB = require('./config/db');

connectDB();

app.use(cors({
    origin:process.env.CLIENT_URL,
    methods:['GET','POST','PATCH'],
    credentials:true
}));

app.use(cookieSession({
    name:'session',
    keys:process.env.SESSION_KEY,
    maxAge:24*60*60*1000
}));



// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, '../frontend/build')));

// app.get('/*', function(req,res){
//     res.sendFile(
//         path.join(__dirname, '../frontend/build/index.html'),
//         function(err){
//             if(err){
//                 res.status(500).send(err);
//             }
//         }
//     );
// });

app.use('/',userRoute);
app.use('/admin',adminRoute);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);

const server = app.listen(process.env.PORT,console.log('Server Started on PORT ',process.env.PORT));

const io = require('socket.io')(server,{
    pingTimeout:60000,
    cors:{
        origin:'http://localhost:3000'
    }
});

io.on('connection',(socket)=>{
    console.log('connected socket.io');
    socket.on('setup',(userData)=>{
        socket.join(userData.id);
        socket.emit('connected');
    });

    socket.on('join chat',(room)=>{
        socket.join(room);
    });

    socket.on('typing',(room)=>socket.in(room).emit('typing'));
    socket.on('stop typing',(room)=>socket.in(room).emit('stop typing'));

    socket.on('new message',(newMsgRecieved)=>{
        let chat = newMsgRecieved.chat;
        if(!chat.users){
            return console.log('chat.users not defined');
        }
        chat.users.forEach(user => {
            if(user._id==newMsgRecieved.sender._id){
                return;
            }
            socket.in(user._id).emit('message recieved',newMsgRecieved);
        });
    });

    socket.off('setup',()=>{
        console.log('socket disconnected');
        socket.leave(userData.id);
    });
});