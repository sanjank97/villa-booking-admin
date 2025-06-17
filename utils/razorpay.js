const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: 'rzp_test_iyo2xuccNd7DP7',       // Replace with your test Key ID
  key_secret: 'h0ZvUTH0nXKsUPaAU7BRLrjY',    // Replace with your test Key Secret
});

module.exports = razorpay;