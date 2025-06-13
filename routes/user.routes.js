// routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyAdmin } = require('../middlewares/auth.middleware');

// GET all users

router.get('/', verifyAdmin, userController.getAllUsers);

module.exports = router;
