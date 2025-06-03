// routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// GET all users
router.get('/', userController.getAllUsers);

module.exports = router;
