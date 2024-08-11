const express = require('express');
const router = express.Router();
const {paymentController} = require('../controllers');

router.post(
    '/buy',
    paymentController.createPayment
);

router.post(
    '/verify',
    paymentController.verifyPayment
);

module.exports = router;

