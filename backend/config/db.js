const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        mongoose.set('strictQuery', false);
        const mongo = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology: true,
        });
        console.log(`mongodb connected:${mongo.connection.host}`);
    } catch (error) {
        console.error('Error:',error.message);
        process.exit();
    }
};

module.exports = connectDB;