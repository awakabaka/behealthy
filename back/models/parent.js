const mongoose = require('mongoose');

const parentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    address: { type: String, required: true},
    city: { type: String, required: true},
    phone: { type: String, required: true },
});

module.exports = mongoose.model("Parent", parentSchema);