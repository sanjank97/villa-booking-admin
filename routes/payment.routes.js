const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.post('/create-order', verifyToken, paymentController.createPayment);
router.post('/verify', paymentController.verifyPayment);

module.exports = router;











