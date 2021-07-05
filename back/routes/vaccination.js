const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const Visit = require('../models/visit');
const Vaccination = require('../models/vaccination');

router.get('/', (req, res, next) => {
    Visit.find()
        .select('doctorId patientId type simptomps treatment notes height weight reflexes  vaccination time _id')
        .populate('doctorId', 'patientId')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                visits: docs.map(doc => {
                    return {
                        _id: doc._id,
                        doctorId: doc._doctorId,
                        patientId: doc.patientId,
                        type: doc.type,
                        simptomps: doc.simptomps,
                        treatment: doc.treatment,
                        notes: doc.notes,
                        height: doc.height,
                        weight: doc.weight,
                        reflexes: doc.reflexes,
                        vaccination: doc.vaccination,
                        time: doc.time,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/visit/' + doc._id
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

router.post('/', (req, res, next) => {
    Patient.findById(req.body.patientId)
        .then(user => {
            if (!user) {
                res.status(404).json({
                    message: "Patient not found!"
                })
            }
            Doctor.findById(req.body.doctorId)
                .then(doctor => {
                    if (!doctor) {
                        res.status(404).json({
                            message: "Doctor not found!"
                        })
                    }
                    const vaccination = new Vaccination({
                        _id: mongoose.Types.ObjectId(),
                        doctorId: req.body.doctorId,
                        patientId: req.body.patientId,
                        name: req.body.name,
                        dose: req.body.dose,
                        series: req.body.series,
                        reaction: req.body.reaction,
                        visitId: req.body.visitId
                    });
                    return vaccination
                        .save()
                        .then(result => {
                            console.log(result);
                            res.status(200).json({
                                vaccination: {
                                    _id: mongoose.Types.ObjectId(),
                                    doctorId: result.doctorId,
                                    patientId: result.patientId,
                                    name: result.name,
                                    dose: result.dose,
                                    series: result.series,
                                    reaction: result.reaction,
                                    visitId: result.visitId,
                                    time: result.time
                                }
                            });
                        });

                })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.get('/user/:patientId', (req, res, next) => {
    Visit.find({"patientId": req.params.patientId})
        .sort({'_id':-1})
        .exec()
        .then(visit => {
            if (!visit) {
                return res.status(404).json({
                    message: 'Doctor not found'
                });
            }
            res.status(200).json({
                visit: visit
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.get('/search/:patientId', (req, res, next) => {
    Vaccination.find({"patientId": req.params.patientId})
        .select('doctorId patientId name dose series reaction visitId time')
        .populate('doctorId')
        .exec()
        .then(docs => {
            res.status(200).json({
                vaccination: docs.map(doc => {
                    return {
                        doctorId: doc.doctorId.name,
                        name: doc.name,
                        dose: doc.dose,
                        series: doc.series,
                        reaction: doc.reaction,
                        time: doc.time
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

router.get("/vaccination/:visitId", (req, res, next) => {
    Visit.find({"patientId": req.params.visitId})
        .select('doctorId vaccination time _id')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                visits: docs.map(doc => {
                    return {
                        _id: doc._id,
                        doctorId: doc._doctorId,
                        vaccination: doc.vaccination,
                        time: doc.time,

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

router.delete("/:visitId", (req, res, next) => {
    const id = req.params.visitId;
    Visit.remove({ _id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Delete successful!',
                request: {
                    type: "GET",
                    url: "http://localhost:3000/visit/"
                }
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