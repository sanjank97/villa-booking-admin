const db = require('../db');
const bcrypt = require('bcryptjs');

// Make sure getUserByEmail is defined properly in this file or imported
exports.getUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows.length > 0 ? rows[0] : null;
};

exports.authenticateUserByEmail = async (email, password) => {
  const user = await exports.getUserByEmail(email); // fixed 'this' context issue
  if (!user) return null;

  console.log('DB Password Hash:', user.password_hash);
console.log('Input Password:', password);

  const isMatch = await bcrypt.compare(password, user.password_hash);
  return isMatch ? user : null;
};


exports.createUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await db.query(
    'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
    [name, email, hashedPassword]
  );
  return result.insertId;
};
