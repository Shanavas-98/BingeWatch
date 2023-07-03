/* eslint-disable no-undef */
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const path = require('path');
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('DB connection successfull');
}).catch((err)=>{
    console.log(err.message);
});

app.use(cors({
    origin:process.env.CLIENT_URL,
    methods:['GET','POST'],
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
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',userRouter);
app.use('/admin',adminRouter);

app.listen(process.env.PORT,()=>{
    console.log('Server Started on PORT ',process.env.PORT);
});