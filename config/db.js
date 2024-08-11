const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = () => {
    try{
        const uri = process.env.MONGO_URI;
        mongoose.connect(uri);
        console.log("database is connected.");
    }catch(err){
        console.log("failed to connect database",err.message);

    }
}

module.exports = connectDB;