const express = require('express');
require('dotenv').config();
const paymentRouter = require('./routes/payment.router.js');
const Razorpay = require('razorpay')

const app = express();
app.get('/' , (req,res) => {
    res.send("hello server welcome to payment Integration");
})
app.use(bodyParser.json());
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});
app.use('api' , paymentRouter);


const PORT = process.env.PORT||7070;
app.listen(PORT , () => {
    console.log(`server is running at port ${PORT}`);
});

module.exports = instance;