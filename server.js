const express = require('express');
require('dotenv').config();
const router = require('./routes');
const Razorpay = require('razorpay')
const database = require('./config/db.js');
database();
const app = express();
app.use(express.json());
app.get('/' , (req,res) => {
    res.send("hello server welcome to payment Integration");
})
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});
app.use('/api' , router);


const PORT = process.env.PORT||7070;
app.listen(PORT , () => {
    console.log(`server is running at port ${PORT}`);
});

module.exports = instance;