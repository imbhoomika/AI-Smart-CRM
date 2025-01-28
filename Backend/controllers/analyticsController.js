const Analytics = require('../models/Analytics');

exports.getAnalytics = async (req, res) => {
    try {
        const data = await Analytics.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.addAnalytics = async (req, res) => {
    try {
        const analytics = new Analytics(req.body);
        await analytics.save();
        res.status(201).json(analytics);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
