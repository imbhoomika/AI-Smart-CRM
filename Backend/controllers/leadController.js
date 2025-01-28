const Lead = require("../models/Lead");

// Create a new lead
exports.createLead = async (req, res) => {
  const { name, company, email, phone, status } = req.body;

  try {
    const newLead = new Lead({
      name,
      company,
      email,
      phone,
      status,
    });

    await newLead.save();
    res.status(201).json(newLead);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Get all leads
exports.getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Update lead status
exports.updateLeadStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ msg: "Lead not found" });
    }

    lead.status = status;
    await lead.save();
    res.json(lead);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
