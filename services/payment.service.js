const Razorpay = require('razorpay');
require('dotenv').config();
const {Product} = require('../models/product.model.js');
const {Payment} = require('../models/payment.model.js');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req,res) => {
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

export const paymentById = async (req,res) => {
    const {paymentId} = req.params;
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_API_KEY,
        key_secret: process.env.RAZORPAY_API_SECRET
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

export const createPayment = async (req, res) => {
    try {
        const { products, currency } = req.body;

        // Calculate the total amount
        let totalAmount = 0;
        for (const item of products) {
            const product = await Product.findById(item.productId);
            if (product) {
                totalAmount += product.price * item.quantity;
            } else {
                return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
            }
        }

        const options = {
            amount: totalAmount * 100, // amount in smallest currency unit
            currency: currency,
            receipt: `order_rcptid_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        // Save the payment info in the database
        const payment = new Payment({
            razorpay_order_id: order.id,
            amount: totalAmount,
            currency: currency,
            products: products,
            status: 'created',
        });
        await payment.save();

        res.json(order);
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).send('Server Error');
    }
}



export const verifyPayment =  async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            const payment = await Payment.findOne({ razorpay_order_id });

            if (!payment) {
                return res.status(404).json({ message: 'Payment record not found' });
            }

            payment.razorpay_payment_id = razorpay_payment_id;
            payment.razorpay_signature = razorpay_signature;
            payment.status = 'paid';
            await payment.save();

            // Update product inventory
            for (const item of payment.products) {
                const product = await Product.findById(item.productId);
                if (product) {
                    product.stock -= item.quantity;
                    await product.save();
                }
            }

            res.json({ message: 'Payment verified and products updated successfully' });
        } else {
            res.status(400).json({ message: 'Invalid signature' });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).send('Server Error');
    }
};