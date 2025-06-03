// controllers/user.controller.js
const User = require('../models/user.model');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};
