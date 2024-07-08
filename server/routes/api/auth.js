// routes/api/auth.js
const express = require('express');
const router = express.Router();
const { register, login, logout, getUser } = require('../../controllers/authController');
const auth = require('../../middleware/auth');

// Register a new user
router.post('/register', register);

// Login an existing user
router.post('/login', login);

// Logout user
router.post('/logout', logout);

// Get user data
router.get('/user', auth, getUser);

module.exports = router;
