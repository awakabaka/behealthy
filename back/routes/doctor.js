const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const Doctor = require('../models/doctor');
const Patient = require('../models/patient')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 5}
});

router.get('/', (req, res, next) => {
    Doctor.find()
    .select('name specialty specialization university city workAddress phone email password city licence _id')
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
                    photo: doc.photo,
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


const JWT_KEY = "MuSecretHz";

router.post("/login", (req, res, next) => {
    Doctor.find({ "email": req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json({
                    message: "Auth failed"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(404).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            _id: user[0]._id,
                            email: user[0].email,
                        },
                        JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    console.log("token: ", token)
                    return res.status(200).json({
                        token: token
                    });
                    console.log("new token ", token)
                }
                res.status(401).json({
                    message: "Auth failed"
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/signup', (req, res, next) => {
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
                        const doctor = new Doctor({
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


router.post('/', (req, res, next) => {
    Doctor.find({email: req.body.email})
    .then(user => {
        if (!user) {
            res.status(404).json({
                message: "User not found!"
            })
        }
        const doctor = new Doctor({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            specialty: req.body.specialty,
            specialization: req.body.specialization,
            university: req.body.university,
            workAddress: req.body.workAddress,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password,
            city: req.body.city,
            photo: req.body.photo
        });
        return doctor
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                    _id: result._id,
                    name: result.name,
                    specialty: result.specialty,
                    specialization: result.specialization,
                    university: result.university,
                    city: result.city,
                    workAddress: result.workAddress,
                    phone: result.phone,
                email: result.email,
                password: result.password,
                city: result.city,
                    photo: result.photo
            });
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:doctorId',  (req, res, next) => {
    Doctor.findById({"_id": req.params.doctorId})
        .select('_id name specialty specialization university workAddress city phone email photo')
        .exec()
    .then(doctor => {
        if (!doctor) {
            return res.status(404).json({
                message: 'Doctor not found'
            });
        }
        res.status(200).json({
            _id: doctor._id,
            name: doctor.name,
            specialty: doctor.specialty,
            specialization: doctor.specialization,
            university: doctor.university,
            workAddress: doctor.workAddress,
            city: doctor.city,
            phone: doctor.phone,
            email: doctor.email,
            photo: doctor.photo
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

router.patch("/:doctorId", (req, res, next) => {
    const id = req.params.doctorId;
    Doctor.update({ _id: id}, { $set: {name: req.body.name,
        specialty: req.body.specialty,
        specialization: req.body.specialization,
        city: req.body.city,
        university: req.body.university,
        workAddress: req.body.workAddress,
        phone: req.body.phone,
            email: req.body.email,
            password: req.body.password,
            city: req.body.city
    }})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: "Doctor updated!",
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete("/:doctorId", (req, res, next) => {
    const id = req.params.doctorId;
    Doctor.remove({ _id: id})
    .exec()
    .then(result => {
            Patient.update({ doctorId: id}, { $set: {doctorId: null}})
                .exec()
                .then(result => {
                    console.log(result);
                    res.status(200).json({
                        message: "Patient updated!",
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get("/search/:name", (req, res, next) => {
    Doctor.find({"name": req.params.name})
    .select('name specialty city photo _id')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            doctors: docs.map(doc => {
                return {
                    _id: doc._id,
                    userId: doc.userId,
                    name: doc.name,
                    specialty: doc.specialty,
                    specialization: doc.specialization,
                    university: doc.university,
                    workAddress: doc.workAddress,
                    phone: doc.phone,
                    email: doc.email,
                    password: doc.password,
                    city: doc.city,
                    photo: doc.photo,
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

module.exports = router;