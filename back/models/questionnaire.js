const mongoose = require('mongoose');

const questionnaireSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true},
    cry: {type: String, required: true},
    localizationOfSwearing: {type: String},
    smellOfSwearing: {type: String},
    frequenceOfUrination: {type: String, required: true},
    colorOfUrination: {type: String},
    faces: { type: String},
    frequenceOfFaces: {type: String, required: true},
    colorOfFaces: {type: String},
    feed: { type: String, required: true },
    typeFeed: { type: String, required: true },
    breath: { type: String, required: true},
    skin: { type: String, required: true },
    ast: { type: Number, required:true },
    time: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Questionnaire", questionnaireSchema);