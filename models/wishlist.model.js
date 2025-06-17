const db = require('../db');

exports.addToWishlist = async (user_id, villa_id) => {
  // First check if already exists to prevent duplicates
  const [existing] = await db.query(
    `SELECT * FROM wishlists WHERE user_id = ? AND villa_id = ?`,
    [user_id, villa_id]
  );
  
  if (existing.length > 0) {
    throw new Error('Villa already in wishlist');
  }

  const [result] = await db.query(
    `INSERT INTO wishlists (user_id, villa_id) VALUES (?, ?)`,  // Removed comma after villa_id
    [user_id, villa_id]
  );
  
  return result.insertId;
};

exports.getAllWishlist = async (user_id) => {
  const [rows] = await db.query(
    `SELECT villa_id FROM wishlists WHERE user_id = ?`,
    [user_id]
  );
  return rows;
};

exports.removeWishlist = async (user_id, villa_id) => {
   await db.query('DELETE FROM wishlists WHERE user_id = ? AND villa_id = ?', [user_id, villa_id]);
}
