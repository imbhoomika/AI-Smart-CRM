const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
    metric: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    recordedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Analytics', AnalyticsSchema);
