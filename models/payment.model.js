const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({

    razorpay_payment_id:{
        type: String,
    },   
    razorpay_order_id:{
        type: String,
    },
    razorpay_signature:{
        type: String,
    },
    amount:{
        type: Number,
    },
    currency:{
        type: String,
    },
    products: [{
        productId: mongoose.Schema.Types.ObjectId,
        quantity: Number,
    }],

    status: String,

    
},{timestamps: true});

module.exports = mongoose.model('Payment', PaymentSchema);