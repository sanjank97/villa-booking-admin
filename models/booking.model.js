const db = require('../db');

exports.createBooking = async ({ user_id, villa_id, start_date, end_date }) => {
  const [result] = await db.query(
    `INSERT INTO bookings (user_id, villa_id, start_date, end_date)
     VALUES (?, ?, ?, ?)`,
    [user_id, villa_id, start_date, end_date]
  );
  return result.insertId;
};

exports.getUserBookings = async (user_id) => {
  const [rows] = await db.query(
    `SELECT b.*, v.name as villa_name, v.location 
     FROM bookings b 
     JOIN villas v ON b.villa_id = v.id 
     WHERE b.user_id = ? ORDER BY b.created_at DESC`,
    [user_id]
  );
  return rows;
};

exports.getBookingsForVilla = async (villa_id) => {
  const [rows] = await db.query(
    `SELECT start_date, end_date FROM bookings 
     WHERE villa_id = ? AND status = 'approved'`,
    [villa_id]
  );
  return rows;
};

exports.getAllBookings = async () => {
  const [rows] = await db.query(
    `SELECT b.*, v.name as villa_name, v.location, u.name as user_name, u.email
     FROM bookings b
     JOIN villas v ON b.villa_id = v.id
     JOIN users u ON b.user_id = u.id
     ORDER BY b.created_at DESC`
  );
  return rows;
};


exports.updateBookingStatus = async (bookingId, status) => {
  const sql = 'UPDATE bookings SET status = ? WHERE id = ?';
  const [result] = await db.query(sql, [status, bookingId]);
  return result; 
};


exports.getBookingById = async (booking_id) => {
  const [rows] = await db.query(`
    SELECT 
      b.id AS booking_id,
      b.start_date,
      b.end_date,
      b.status,
      b.created_at,
      
      u.id AS user_id,
      u.name AS user_name,
      u.email AS user_email,
      
      v.id AS villa_id,
      v.name AS villa_name,
      v.location AS villa_location,
      v.price_per_night,
      
      p.amount AS paid_amount,
      p.payment_id,
      p.order_id

    FROM bookings b
    JOIN users u ON u.id = b.user_id
    JOIN villas v ON v.id = b.villa_id
    LEFT JOIN payments p ON p.booking_id = b.id
    WHERE b.id = ?
  `, [booking_id]);

  return rows[0]; // Return single booking record
};

