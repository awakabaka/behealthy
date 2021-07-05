const mongoose = require('mongoose');

const visitSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    patientId: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    type: {type: String, required: true },
    simptomps: { type: String, default: "-" },
    diagnosis: {type: String, default: "в"},
    treatment: { type: String, default: "-" },
    notes: { type: String, default: "-" },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    reflexes: { type: String, default: "-" },
    vaccination: { type: String, default: "-" },
    time: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Visit", visitSchema);