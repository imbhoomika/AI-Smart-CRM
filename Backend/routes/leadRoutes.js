const express = require('express');
const { createLead, getLeads, updateLead, deleteLead } = require('../controllers/leadController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create a new lead (Protected)
router.post('/', authMiddleware, createLead);

// Get all leads (Protected)
router.get('/', authMiddleware, getLeads);

// Update a lead by ID (Protected)
router.put('/:id', authMiddleware, updateLead);

// Delete a lead by ID (Protected)
router.delete('/:id', authMiddleware, deleteLead);

module.exports = router;
