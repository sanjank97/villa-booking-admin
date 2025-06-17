
const db = require('../db');

exports.savePayment = async ({ booking_id, order_id, amount, currency, status }) => {
  const [result] = await db.query(
    `INSERT INTO payments 
      (booking_id, order_id, amount, currency, status) 
     VALUES (?, ?, ?, ?, ?)`,
    [booking_id, order_id, amount, currency, status]
  );
  return result.insertId;
};