const db = require('../db');

exports.getAllVillas = async () => {
  const [rows] = await db.query('SELECT * FROM villas');
  return rows;
};

exports.getVillasbyId = async (id) => {
  const [rows] = await db.query('SELECT * FROM villas where id = ?', [id]);
  if (rows.length === 0) {  
    throw new Error('Villa not found');
  }
  return rows;
};

exports.createVilla = async (villa) => {
  const { name, location, price, description } = villa;
  const [result] = await db.query(
    'INSERT INTO villas (name, location, price_per_night, description) VALUES (?, ?, ?, ?)',
    [name, location, price, description]
  );
  return result.insertId;
};

exports.updateVilla = async (id, villa) => {
  const { name, location, price, description } = villa;
  await db.query(
    'UPDATE villas SET name = ?, location = ?, price_per_night = ?, description = ? WHERE id = ?',
    [name, location, price, description, id]
  );
};

exports.deleteVilla = async (id) => {
  await db.query('DELETE FROM villas WHERE id = ?', [id]);
};
