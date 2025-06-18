const bookingModel = require('../models/booking.model');

exports.bookVilla = async (req, res) => {
  const { villa_id, start_date, end_date } = req.body;
  const user_id = req.user.id;

  try {
    const existingBookings = await bookingModel.getBookingsForVilla(villa_id);

    const newStart = new Date(start_date);
    const newEnd = new Date(end_date);

    const isConflict = existingBookings.some(b => {
      const existingStart = new Date(b.start_date);
      const existingEnd = new Date(b.end_date);

      // Check for overlap: (A starts before B ends) and (A ends after B starts)
      return newStart <= existingEnd && newEnd >= existingStart;
    });

    if (isConflict) {
      return res.status(409).json({ message: 'Booking dates conflict with an existing booking' });
    }

    const bookingId = await bookingModel.createBooking({ user_id, villa_id, start_date, end_date });
    res.status(201).json({ message: 'Booking submitted', bookingId });

  } catch (err) {
    res.status(500).json({ message: 'Error booking villa', error: err.message });
  }
};


exports.getMyBookings = async (req, res) => {
  const user_id = req.user.id;

  try {
    const bookings = await bookingModel.getUserBookings(user_id);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving bookings', error: err.message });
  }
};


exports.getBookedDatesForVilla = async (req, res) => {
  const villa_id = req.params.id;

  try {
    const bookings = await bookingModel.getBookingsForVilla(villa_id);

 
    const allDates = bookings.flatMap(({ start_date, end_date }) => {
      const dates = [];
      let current = new Date(start_date);
      const end = new Date(end_date);

      // Force conversion to Asia/Kolkata timezone and get only date part
      while (current <= end) {
        const indiaDate = new Date(current.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
        const year = indiaDate.getFullYear();
        const month = String(indiaDate.getMonth() + 1).padStart(2, '0');
        const day = String(indiaDate.getDate()).padStart(2, '0');
        dates.push(`${year}-${month}-${day}`);

        current.setDate(current.getDate() + 1);
      }

      return dates;
    });

    const uniqueDates = [...new Set(allDates)];

    res.json({ bookedDates: uniqueDates });

  } catch (err) {
    res.status(500).json({ message: 'Error fetching booked dates', error: err.message });
  }
};


exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.getAllBookings();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving all bookings', error: err.message });
  }
};

exports.getBookingById = async (req, res) => {
  const booking_id = req.params.booking_id;
  try {
    const booking = await bookingModel.getBookingById(booking_id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving booking', error: err.message });
  }
};


