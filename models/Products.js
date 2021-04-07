const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    mark: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startBid: {
        type: Number,
        required: true
    },
    isDone: {
        type: Boolean,
        required: true
    },
    liveUsers: {
        type: [String],
        default: []
    },
    activeUser: {
        type: String,
    },
    isStarted: {
        type: Boolean,
        default: false,
    },
    isFinished: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('productsModel', productsSchema);
