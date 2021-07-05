const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const DoctorRequest = require('../models/doctorRequest');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');

router.get('/', (req, res, next) => {
    DoctorRequest.find()
        .select('name specialty specialization university city workAddress phone email password city license _id')
        .exec()
        .then(docs => {
            res.status(200).json({
                doctor: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        specialty: doc.specialty,
                        specialization: doc.specialization,
                        university: doc.university,
                        city: doc.city,
                        workAddress: doc.workAddress,
                        email: doc.email,
                        password: doc.password,
                        phone: doc.phone,
                        license: doc.license,
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

router.post('/addrequest', (req, res, next) => {
   console.log(req)
    Doctor.find({ "email": req.body.email })
        .exec()
        .then(doctor => {
            if (doctor.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const doctor = new DoctorRequest({
                            _id: mongoose.Types.ObjectId(),
                            name: req.body.name,
                            specialty: req.body.specialty,
                            specialization: req.body.specialization,
                            university: req.body.university,
                            workAddress: req.body.workAddress,
                            phone: req.body.phone,
                            email: req.body.email,
                            password: hash,
                            city: req.body.city,
                            license: req.body.license
                        });
                        return doctor
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
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
            }
        });
});

router.patch('/:doctorId',  (req, res, next) => {
    const idRequest = req.body._id
    DoctorRequest.findById({"_id": req.params.doctorId})
        .select('_id name specialty specialization university password workAddress city phone email license')
        .exec()
        .then(request => {
            if (!request) {
                return res.status(404).json({
                    message: 'Request not found'
                });
            }
            const doctor = new Doctor({
                _id: mongoose.Types.ObjectId(),
                name: request.name,
                specialty: request.specialty,
                specialization: request.specialization,
                university: request.university,
                workAddress: request.workAddress,
                phone: request.phone,
                email: request.email,
                password: request.password,
                city: request.city,
                license: request.license
            });
            doctor
                .save()
                .then(result => {
                    request.remove().then(result => {
                            res.status(200).json({
                                message: 'Delete successful!',
                                request: {
                                    type: "GET",
                                    url: "http://localhost:3000/doctor/"
                                }
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        });
                    console.log(result);
                })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.delete("/:doctorId", (req, res, next) => {
    const id = req.params.doctorId;
    DoctorRequest.remove({ _id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Delete successful!',
                request: {
                    type: "GET",
                    url: "http://localhost:3000/doctor/"
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