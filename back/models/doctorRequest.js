const mongoose = require('mongoose');

const doctorRequestSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    specialization: { type: String, required: true },
    university: { type: String, required: true },
    city: {type: String, required: true},
    workAddress: { type: String, required: true },
    phone: { type: String, required: true },
    email: {type: String, required: true},
    license: {type: String, required: true},
    password: {type: String, required: true}
});

module.exports = mongoose.model("DoctorRequest", doctorRequestSchema);