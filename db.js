// db.js
const mysql = require('mysql2/promise');
const config = require('./config');

const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the DB connection when app starts
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL database connection established successfully.');
    connection.release(); // Important to release the connection back to pool
  } catch (err) {
    console.error('❌ Failed to connect to the MySQL database:', err.message);
    process.exit(1); // Stop the app if DB connection fails
  }
})();

module.exports = pool;
