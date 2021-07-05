const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const Patient = require('../models/patient')
const Parent = require('../models/parent')
const Questionnaire = require('../models/questionnaire')
const ChildStateMonitor = require('../models/childStateMonitorPuls')

router.get('/', (req, res, next) => {
    Patient.find()
    .select('_id doctorId parentId male name birthday blood height weight fullTerm photo')
    .populate('parentId')
    .exec()
    .then(docs => {
        res.status(200).json({
            patient: docs.map(doc => {
                return {
                    _id: doc._id,
                    parentId: doc.parentId,
                    doctorId: doc.doctorId,
                    male: doc.male,
                    name: doc.name,
                    birthday: doc.birthday,
                    blood: doc.blood,
                    height: doc.height,
                    weight: doc.weight,
                    fullTerm: doc.fullTerm,
                    photo: doc.photo,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/patient/' + doc._id
                    }
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

router.post("/add", (req, res, next) => {
    Parent.findById(req.body.parentId)
        .exec()
        .then(parent => {
            if (parent.length >= 1) {
                return res.status(404).json({
                    message: "Parent not found!"
                });
            } else {
                        const patient = new Patient({
                            _id: mongoose.Types.ObjectId(),
                            male: req.body.male,
                            name: req.body.name,
                            birthday: req.body.birthday,
                            height: req.body.height,
                            weight: req.body.weight,
                            fullTerm: req.body.fullTerm,
                            blood: req.body.blood,
                            parentId: req.body.parentId,
                            photo: req.body.photo
                        });
                        return patient
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "Patient created",
                                    _id: result._id
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
        });
});

router.get("/:patientId", (req, res, next) => {
    Patient.findById(req.params.patientId)
    .populate('doctorId')
    .exec()
    .then(patient => {
        if (!patient) {
            return res.status(404).json({
                message: 'Patient not found'
            });
        }
        res.status(200).json({
            patient: patient,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/patient/'
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

router.get("/parent/:patientId", (req, res, next) => {
    Patient.findById(req.params.patientId)
        .populate('parentId')
        .exec()
        .then(patient => {
            if (!patient) {
                return res.status(404).json({
                    message: 'Patient not found'
                });
            }
            res.status(200).json({
                patient: patient,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/patient/'
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.get("/hz/:patientId", (req, res, next) => {
    Patient.findById(req.params.patientId)
        .exec()
        .then(patient => {
            if (!patient) {
                return res.status(404).json({
                    message: 'Patient not found'
                });
            }
            res.status(200).json({
                patient: patient,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/patient/'
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.get("/children/:parentId", (req, res, next) => {
    Patient.find({"parentId": req.params.parentId})
        .exec()
        .then(patient => {
            if (!patient) {
                return res.status(404).json({
                    message: 'Patient not found'
                });
            }
            res.status(200).json({
                patient: patient,
                request: {
                    type: 'GET',
                    url: 'http://localhost:5000/patient/'
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.get("/profile/:patientId", (req, res, next) => {
    Patient.findById({"_id": req.params.patientId})
        .select('_id doctorId parentID male name blood birthday height ' +
            'weight fullTerm photo')
        .exec()
        .then(patient => {
            if (!patient) {
                return res.status(404).json({
                    message: 'Patient not found'
                });
            }
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            res.header('Expires', '-1');
            res.header('Pragma', 'no-cache');
            res.status(200).json({
               _id: patient._id,
                doctorId: patient.doctorId,
                male: patient.male,
                name: patient.name,
                birthday: patient.birthday,
                blood: patient.blood,
                height: patient.height,
                weight: patient.weight,
                fullTerm: patient.fullTerm,
                photo: patient.photo,
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.patch('/:patientID', (req, res, next) => {
    const id = req.params.patientID;
    Patient.update({ _id: id}, { $set: {name: req.body.name,
            male: req.body.password,
            blood: req.body.blood,
            birthday: req.body.birthday,
            height: req.body.height,
            weight: req.body.weight,
            fullTerm: req.body.fullTerm,
            photo: req.body.photo,}})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: "Patient updated!",
            request: {
                type: "GET",
                url: 'http://localhost:3000/patient/' + id
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

router.delete('/:patientId', (req, res, next) => {
    const id = req.params.patientId;
    Patient.remove({ _id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Delete successful!',
            request: {
                type: "GET",
                url: "http://localhost:3000/patient/"
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

router.get("/search/:value", (req, res, next) => {
    Patient.find({"doctorId": req.params.value})
        .select('_id doctorId parentId male name birthday blood height weight fullTerm photo')
        .populate('parentId')
    .exec()
    .then(docs => {
        res.status(200).json({
        patient: docs.map(doc => {
                return {
                    _id: doc._id,
                    parentId: doc.parentId,
                    name: doc.name,
                    birthday: doc.birthday,
                    male: doc.male,
                    photo: doc.photo
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

module.exports = router;