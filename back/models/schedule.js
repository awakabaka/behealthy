const mongoose = require('mongoose')

const scheduleSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true},
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true},
    date: {type: Date, required: true},
    time: { type: String, required: true },
    status: {type: Boolean, default: false}
});

module.exports = mongoose.model('Schedule', scheduleSchema);