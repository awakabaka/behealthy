const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment');

const Puls = require('../models/childStateMonitorPuls');
const Patient = require('../models/patient');

router.get('/', (req, res, next) => {
    Puls.find()
    .select('patientId pulse temperature time _id')
    .populate('patientId')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            pus: docs.map(doc => {
                return {
                    _id: doc._id,
                    patientId: doc.patientId,
                    pulse: doc.pulse,
                    temperature: doc.temperature,
                    time: doc.time,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/puls/' + doc._id
                    }
                }
            })
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.post('/:patientId', (req, res, next) => {
    const paramsUserId = req.params.patientId;
    Patient.findById(paramsUserId)
    .then(patient => {
        if (!patient) {
            res.status(404).json({
                message: "User not found!"
            })
        }
        const newPulse = new Puls({
            _id: mongoose.Types.ObjectId(),
            patientId: paramsUserId,
            pulse: req.body.pulse,
            temperature: req.body.temperature,
            time: req.body.time
        });
        return newPulse
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                    _id: result._id,
                    patientId: result.patientId,
                    pulse: result.pulse,
                    temperature: result.temperature,
                    time: result.time
            });
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.get("/:patientId", (req, res, next) => {
    Puls.find({"patientId": req.params.patientId})
        .limit(100)
    .exec()
    .then(puls => {
        if (!puls) {
            return res.status(404).json({
                message: 'Patient not found'
            });
        }
        res.status(200).json({
            puls
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

router.get("t/:patientId", (req, res, next) => {
Puls.find({"patientId": req.params.patientId})
    .select('temperature')
    .exec()
    .then(temp => {
        if (!temp) {
            return res.status(404).json({
                message: 'Patient not found'
            });
        }
        res.status(200).json({
            te: temp

        })
    })
});


router.get("/test/:patientId", (req, res, next) => {
    Puls.find({"patientId": req.params.patientId})
        .exec()
        .then(puls => {
            if (!puls) {
                return res.status(404).json({
                    message: 'Patient not found'
                });
            }
            res.status(200).json({
                pulse: {
                    labels: res.pulse,
                    background: "#f87979",
                    data: res.pulse
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.get("/now/:patientId", (req, res, next) => {
    Puls.findOne({"patientId": req.params.patientId})
    .sort({'_id':-1})
    .exec()
    .then(puls => {
        if (!puls) {
            return res.status(404).json({
                message: 'Info not found'
            });
        }
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        res.status(200).json({
            _id: puls._id,
            patientId: puls.patientId,
            pulse: puls.pulse,
            temperature: puls.temperature,
            time: puls.time
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

module.exports = router;