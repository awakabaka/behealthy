const mongoose = require('mongoose');

const patientRequestSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    patientId: { type: mongoose.Schema.Types.ObjectId, required: true},
    doctorId: { type: mongoose.Schema.Types.ObjectId, required: true},
});

module.exports = mongoose.model("PatientRequest", patientRequestSchema);