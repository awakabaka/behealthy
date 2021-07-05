const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', default: null},
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Parent', required: true},
    male: {type: String, required: true},
    name: {type: String, required: true},
    birthday: { type: Date, required: true},
    height: {type: Number, required: true},
    weight: { type: Number, required: true },
    blood: { type: String, required: true},
    fullTerm: { type: String, required: true },
    photo: { type: String, default: null },
});

module.exports = mongoose.model("Patient", patientSchema);

