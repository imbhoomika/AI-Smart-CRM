const express = require('express');

const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');


// Define routes
router.post('/register', register); // Register route
router.post('/login', login);       // Login route

// Protect getProfile route with authentication middleware


router.get('/profile', authMiddleware, getProfile);

module.exports = router;
