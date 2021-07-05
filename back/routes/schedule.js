const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const Schedule = require('../models/schedule');


router.get('/', (req, res, next) => {
    Schedule.find()
        .select('doctorId patientId date time _id')
        .populate('doctorId')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                schedules: docs.map(doc => {
                    return {
                        _id: doc._id,
                        doctorId: doc.doctorId,
                        patientId: doc.patientId,
                        date: doc.date,
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

router.post('/', (req, res, next) => {
    Schedule.find({time: req.body.time, date: req.body.date})
        .then(visit => {
            if (visit.length > 0) {
                return res.status(403).json({
                    message: "Forbidden!",
                    visit: visit
                })}
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

                    const schedule = new Schedule({
                        _id: mongoose.Types.ObjectId(),
                        doctorId: req.body.doctorId,
                        patientId: req.body.patientId,
                        date: req.body.date,
                        time: req.body.time
                    });
                    return schedule
                        .save()
                        .then(result => {
                            console.log(result);
                            res.status(200).json({
                                schedule: {
                                    _id: mongoose.Types.ObjectId(),
                                    doctorId: result.doctorId,
                                    patientId: result.patientId,
                                    date: result.date,
                                    time: result.time
                                }
                            });
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

router.post('/doctor/:doctorId', (req, res, next) => {
    Schedule.find({"doctorId": req.params.doctorId, date: { $gte: req.body.date }})
        .populate('patientId')
        .sort({date: 1, time: 1})
        .exec()
        .then(schedule => {
            if (!schedule) {
                return res.status(404).json({
                    message: 'Schedule not found'
                });
            }
            res.status(200).json(
                schedule
            )
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.post('/doctor/:doctorId/date', (req, res, next) => {
    Schedule.find({doctorId: req.params.doctorId, date: req.body.date})
        .populate('patientId')
        .exec()
        .then(schedule => {
            res.status(200).json(
                schedule
            )
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.get('/patient/:patientId', (req, res, next) => {
    Schedule.find({"patientId": req.params.patientId})
        .populate('doctorId')
        .sort({date: -1, time: 1})
        .exec()
        .then(schedule => {
            if (!schedule) {
                return res.status(404).json({
                    message: 'Schedule not found'
                });
            }
            res.status(200).json({
                schedule: schedule
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.patch('/:scheduleID', (req, res, next) => {
    const id = req.params.scheduleID;
    Schedule.update({ _id: id}, { $set: {status: true}})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Schedule updated!",
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete("/:scheduleId", (req, res, next) => {
    const id = req.params.scheduleId;
    Schedule.remove({ _id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Delete successful!',
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