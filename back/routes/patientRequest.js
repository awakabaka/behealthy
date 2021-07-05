const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const PatientRequest = require('../models/patientRequest');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');

router.post('/', (req, res, next) => {
Patient.findById(req.body.patientId)
    .then(user => {
        if (!user) {
            return res.status(404).json({
                message: "Patient not found!"
            })
        }
        Doctor.findById(req.body.doctorId)
            .then(doctor => {
                if (!doctor) {
                    return res.status(404).json({
                        message: "Doctor not found!"
                    })
                }
                PatientRequest.find({"patientId":req.body.patientId})
                    .then(request => {
                        if (request.length >= 1) {
                            return res.status(409).json({
                                message: "Request exists!"
                            })
                        }
                        const patientRequest = new PatientRequest({
                            _id: mongoose.Types.ObjectId(),
                            patientId: req.body.patientId,
                            doctorId: req.body.doctorId
                        });
                        return patientRequest
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(200).json({
                                        _id: mongoose.Types.ObjectId(),
                                        patientId: result.patientId,
                                        doctorId: result.doctorId
                                });
                            });
                    })
            })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.get("/:doctorId", (req, res, next) => {
    PatientRequest.find({"doctorId": req.params.doctorId})
        .select('_id patientId doctorId')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                request: docs.map(doc => {
                    return {
                        _id: doc._id,
                        patientId: doc.patientId,
                        doctorId: doc.doctorId

                    }
                })
            });
        })
        .catch((err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }));
});

router.get("/patient/:doctorId", (req, res, next) => {
    PatientRequest.find({"patientId": req.params.doctorId})
        .select('_id patientId doctorId')
        .exec()
        .then(docs => {
            if (docs.length < 1) {
                res.status(404).json({
                    message: "Not found"
                })
            } else {
                res.status(200).json({
                    request: docs.map(doc => {
                        return {
                            _id: doc._id,
                            patientId: doc.patientId,
                            doctorId: doc.doctorId

                        }
                    })
                });
            }
        })
        .catch((err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }));
});

router.patch('/:id', (req, res, next) => {
    Patient.update({ _id: req.body.patientId}, { $set: {doctorId: req.body.doctorId}})
        .exec()
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    PatientRequest.remove({ _id: req.params.id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Request add successful!',
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


router.delete('/:id', (req, res, next) => {
    PatientRequest.remove({ _id: req.params.id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Request add successful!',
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;