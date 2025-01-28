const express = require("express");
const { check, validationResult } = require("express-validator");
const Lead = require("../models/Lead"); // Assuming Lead model exists
const authMiddleware = require("../middleware/authMiddleware"); // Assuming you have an authentication middleware
const router = express.Router();

// @route   POST /api/lead
// @desc    Add a new lead
// @access  Private (Only authenticated users can add leads)
router.post(
  "/",
  [
    authMiddleware, // Protect this route with authentication
    check("name", "Lead name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("phone", "Phone number is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, status } = req.body;

    try {
      // Create a new lead
      const newLead = new Lead({
        name,
        email,
        phone,
        status: status || "New", // Default status if none is provided
      });

      await newLead.save();
      res.status(201).json(newLead);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET /api/lead
// @desc    Get all leads
// @access  Private (Only authenticated users can view leads)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET /api/lead/:id
// @desc    Get a lead by ID
// @access  Private (Only authenticated users can view leads)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ msg: "Lead not found" });
    }
    res.json(lead);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT /api/lead/:id
// @desc    Update a lead's details
// @access  Private (Only authenticated users can update leads)
router.put(
  "/:id",
  [
    authMiddleware, // Protect this route with authentication
    check("name", "Lead name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("phone", "Phone number is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, status } = req.body;

    try {
      const lead = await Lead.findById(req.params.id);
      if (!lead) {
        return res.status(404).json({ msg: "Lead not found" });
      }

      lead.name = name || lead.name;
      lead.email = email || lead.email;
      lead.phone = phone || lead.phone;
      lead.status = status || lead.status;

      await lead.save();
      res.json(lead);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   DELETE /api/lead/:id
// @desc    Delete a lead by ID
// @access  Private (Only authenticated users can delete leads)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ msg: "Lead not found" });
    }

    await lead.remove();
    res.json({ msg: "Lead removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
