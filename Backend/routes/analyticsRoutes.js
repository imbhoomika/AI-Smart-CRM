const express = require('express');
const { getAnalytics, addAnalytics } = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Get analytics data (Protected)
router.get('/', authMiddleware, getAnalytics);

// Add a new analytics record (Protected)
router.post('/', authMiddleware, addAnalytics);

module.exports = router;
