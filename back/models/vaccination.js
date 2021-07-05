const mongoose = require('mongoose');

const vaccinationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true},
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true},
    name: {type: String, required: true},
    dose: {type: String, required: true},
    series: { type: String, required: true},
    reaction: {type: String, required: true},
    visitId: {type: mongoose.Schema.Types.ObjectId, ref: 'Visit', required: false},
    time: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Vaccination", vaccinationSchema);