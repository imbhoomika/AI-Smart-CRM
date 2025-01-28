const Lead = require('../models/Lead');

exports.createLead = async (req, res) => {
    try {
        const lead = new Lead({ ...req.body, createdBy: req.user.id });
        await lead.save();
        res.status(201).json(lead);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getLeads = async (req, res) => {
    try {
        const leads = await Lead.find({ createdBy: req.user.id });
        res.json(leads);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updateLead = async (req, res) => {
    try {
        const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(lead);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteLead = async (req, res) => {
    try {
        await Lead.findByIdAndDelete(req.params.id);
        res.json({ message: 'Lead deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
