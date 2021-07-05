const mongoose = require('mongoose');

const Patient = require('./patient');

const pulseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    patientId: {type: mongoose.Schema.Types.ObjectId, required: true },
    pulse: { type: Number},
    temperature: { type: Number },
    time: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Puls", pulseSchema);