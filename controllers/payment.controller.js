const crypto = require('crypto');
const razorpay = require('../utils/razorpay');
const paymentModel = require('../models/payment.model');
const bookingModel = require('../models/booking.model'); 

exports.createPayment = async (req, res) => {
  const { amount, booking_id } = req.body;

  if (!amount || !booking_id) {
    return res.status(400).json({ message: 'Amount and Booking ID are required' });
  }

  const options = {
    amount: amount * 100, // amount in paise
    currency: 'INR',
    receipt: 'receipt_order_' + Math.floor(Math.random() * 100000),
  };

  try {
    const order = await razorpay.orders.create(options);

    // Save payment to DB with status = 'created'
    await paymentModel.savePayment({
      booking_id,
      order_id: order.id,
      amount,
      currency: order.currency,
      status: 'created',
    });

    res.status(200).json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create Razorpay order' });
  }
};




exports.verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    booking_id,
    amount
  } = req.body;

  // Signature verification
  const generated_signature = crypto
    .createHmac('sha256', 'h0ZvUTH0nXKsUPaAU7BRLrjY')
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');

  if (generated_signature !== razorpay_signature) {
    return res.status(400).json({ message: 'Invalid signature' });
  }

  try {
    // 1. Save payment details
    await paymentModel.savePayment({
      booking_id,
      razorpay_order_id,
      razorpay_payment_id,
      amount,
      status: 'success',
    });

    // 2. Update booking status
    await bookingModel.updateBookingStatus(booking_id, 'confirmed');

    res.status(200).json({ message: 'Payment verified and booking confirmed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while verifying payment' });
  }
};