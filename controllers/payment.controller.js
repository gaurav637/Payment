const Razorpay = require('razorpay');
require('dotenv').config();
const {paymentServices} = require('../services');

const {instance} = require('../server.js')

module.exports.createOrder = async (req,res) => {
    try{
        const options = {
            amount: req.body.amount,
            currency: req.body.currency, 
        };
        const order = await instance.orders.create(options);
        console.log("order  -> ",order);
        res.status(200).json({
            success: true,
            order_id: order.id,
            currency: order.currency,
            amount: order.amount,

        });

    }catch(err){
        console.log("Internal error ",err.message);
        res.status(500 ,json({
            success: false,
            Message: "Internal Error",
            err,
        }));
    };
};

module.exports.paymentById = async (req,res) => {
    const {paymentId} = req.params;
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_API_KEY,
        key_secret: process.env.RAZORPAY_API_SECRET,
    });
    try{
        const payment = await razorpay.payments.fetch(paymentId);
        if(!payment){
            return res.status(500).json({
                Message: "Error razorpay loading! ",
                success: "false",
            });
        }

        res.json({
            status: payment.status,
            method: payment.method,
            amount: payment.amount,
            currency: payment.currency,
        });
    }catch(err){
        res.status(500).json({Message: "failed to fetch payment detais"});
    }
}

module.exports.createPayment = async (req,res) => {
    const payment = await paymentServices.createPayment(req,res);
    res.status(200).json({
        Message: "Created",
        success: "true",
        Payment: payment,
    });
}

module.exports.verifyPayment = async (req,res) => {
    const verifyResult = await paymentServices.verifyPayment(req,res);
    res.status(200).json({
        Message: "Verify",
        Success: "true",
        Data: verifyResult,
    });
}