const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const {verifyToken, verifyAdmin} = require('../middlewares/auth.middleware');


router.post('/', verifyToken, bookingController.bookVilla); // Book villa
router.get('/my', verifyToken, bookingController.getMyBookings); // Get user's bookings
router.get('/all', verifyAdmin, bookingController.getAllBookings);
router.get('/:booking_id', verifyToken, bookingController.getBookingById);

router.get('/villa/:id/', bookingController.getBookedDatesForVilla);

module.exports = router;
