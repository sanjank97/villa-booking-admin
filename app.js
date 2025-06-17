// app.js
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
require('./db'); // this will print DB connection status

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/villas', require('./routes/villa.routes'));
app.use('/api/bookings', require('./routes/booking.routes'));
app.use('/api/wishlist', require('./routes/wishlist.routes'));
app.use('/api/payment', require('./routes/payment.routes'));



// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


