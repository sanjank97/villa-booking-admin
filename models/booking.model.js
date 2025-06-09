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
     WHERE villa_id = ? AND status != 'rejected'`,
    [villa_id]
  );
  return rows;
};
