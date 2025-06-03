const bcrypt = require('bcryptjs');
const db = require('../db');
const { generateToken } = require('../utils/jwt.util');
const { authenticateUserByEmail, getUserByEmail } = require('../models/user.model');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authenticateUserByEmail(email, password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


exports.register = async (req, res) => {
  const { name, email, password, role = 'user' } = req.body;

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)`,
      [name, email, hashedPassword, role]
    );

    const newUser = {
      id: result.insertId,
      name,
      email,
      role
    };

    const token = generateToken({ id: newUser.id, email, role });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: newUser
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};