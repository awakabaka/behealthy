const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const Visit = require('../models/visit');

router.get('/', (req, res, next) => {
    Visit.find()
    .select('doctorId patientId type simptomps treatment notes height weight reflexes  vaccination time status _id')
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
                    status: doc.status,
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

    const paramsUserId = req.body.patientId;
    const parpamDactorId = req.body.doctorId;

    Patient.findById(paramsUserId)
    .then(user => {
        if (!user) {
            res.status(404).json({
                message: "Patient not found!"
            })
        }
        Doctor.findById(parpamDactorId)
        .then(doctor => {
            if (!doctor) {
                res.status(404).json({
                    message: "Doctor not found!"
                })
            }
            const visit = new Visit({
                _id: mongoose.Types.ObjectId(),
                doctorId: parpamDactorId,
                patientId: paramsUserId,
                type: req.body.type,
                simptomps: req.body.simptomps,
                treatment: req.body.treatment,
                diagnosis: req.body.diagnosis,
                notes: req.body.notes,
                height: req.body.height,
                weight: req.body.weight,
                reflexes: req.body.reflexes
            });
            return visit
            .save()
            .then(result => {
                console.log(result);
                res.status(200).json({
                    newVisit: {
                        _id: mongoose.Types.ObjectId(),
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
    Patient.update({ _id: paramsUserId}, { $set: {height: req.body.height, weight: req.body.weight}})
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
 Visit.find({"patientId": req.params.patientId})
 .select('doctorId patientId type simptomps treatment notes height weight reflexes  vaccination time status _id')
 .exec()
 .then(docs => {
    res.status(200).json({
        visits: docs.map(doc => {
            return {
                _id: doc._id,
                doctorId: doc.doctorId,
                patientId: doc.patientId,
                type: doc.type,
                simptomps: doc.simptomps,
                treatment: doc.treatment,
                notes: doc.notes,
                height: doc.height,
                weight: doc.weight,
                reflexes: doc.reflexes,
                vaccination: doc.vaccination,
                status: doc.status,
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

router.get('/preview/:patientId', (req, res, next) => {
    Visit.find({"patientId": req.params.patientId})
        .select('diagnosis notes treatment type time')
        .sort({time: 'desc'})
        .limit(4)
        .exec()
        .then(docs => {
            if (docs.length < 1) {
                return res.status(404).json({
                    message: 'Patient not found'
                });
            }
            res.status(200).json({
                visits: docs.map(doc => {
                    return {
                        _id: doc._id,
                        diagnosis: doc.diagnosis,
                        treatment: doc.treatment,
                        notes: doc.notes,
                        type: doc.type,
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

router.get('/reflexes/:patientId', (req, res, next) => {
    Visit.find({"patientId": req.params.patientId})
        .select('reflexes')
        .exec()
        .then(visit => {
            if (!visit) {
                return res.status(404).json({
                    message: 'Visit not found'
                });
            }
            res.status(200).json(
                visit
            )
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