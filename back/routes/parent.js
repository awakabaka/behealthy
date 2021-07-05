const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const Parent = require('../models/parent')
const Patient = require('../models/patient')

router.get('/', (req, res, next) => {
    Parent.find()
        .select('_id name email password address city phone')
        .exec()
        .then(docs => {
            res.status(200).json({
                parent: docs.map(doc => {
                    return {
                        _id: doc._id,
                        city: doc.city,
                        email: doc.email,
                        password: doc.password,
                        name: doc.name,
                        address: doc.address,
                        phone: doc.phone,
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

router.post("/signup", (req, res, next) => {
    Parent.find({ "email": req.body.email })
        .exec()
        .then(parent => {
            if (parent.length >= 1) {
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
                        const parent = new Parent({
                            _id: mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            name: req.body.name,
                            address: req.body.address,
                            phone: req.body.phone,
                            city: req.body.city
                        });
                        return parent
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "Parent created",
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

const JWT_KEY = "MuSecretHz";

router.post("/login", (req, res, next) => {
    const email = req.body.email
    Parent.find({ "email": req.body.email })
        .exec()
        .then(parent => {
            if (parent.length < 1) {
                return res.status(404).json({
                    message: "Auth failed"
                });
            }
            bcrypt.compare(req.body.password, parent[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            parentId: parent[0]._id,
                            email: parent[0].email,
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

router.get("/:parentId", (req, res, next) => {
    Parent.findById(req.params.parentId)
        .exec()
        .then(parent => {
            if (!parent) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }
            res.status(200).json({
                parent: parent,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/parent/'
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.get("/profile/:_id", (req, res, next) => {
    Parent.findById({"_id": req.params._id})
        .select('_id email name city address phone')
        .exec()
        .then(parent => {
            if (!parent) {
                return res.status(404).json({
                    message: 'Parent not found'
                });
            }
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            res.header('Expires', '-1');
            res.header('Pragma', 'no-cache');
            res.status(200).json({
                _id: parent._id,
                email: parent.email,
                password: parent.password,
                city: parent.city,
                name: parent.name,
                address: parent.address,
                phone: parent.phone
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.patch('/:parentID', (req, res, next) => {
    const id = req.params.parentID;
    Parent.update({ _id: id}, { $set: {name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            phone: req.body.phone,
            city: req.body.city
        }})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Parent updated!",
                request: {
                    type: "GET",
                    url: 'http://localhost:3000/parent/' + id
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

router.delete('/:parentId', (req, res, next) => {
    const id = req.params.parentId;
    Parent.remove({ _id: id})
        .exec()
        .then(result => {
            Patient.remove({parentId: id})
                .exec()
                .then(resul => {
                    res.status(200).json({
                        message: 'Delete successful!',
                    });
                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get("/search/:value", (req, res, next) => {
    Parent.find({"_id": req.params.value})
        .select('_id email password name city address phone')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                parent: docs.map(doc => {
                    return {
                        _id: doc._id,
                        email: doc.email,
                        password: doc.password,
                        name: doc.name,
                        city: doc.city,
                        address: doc.address,
                        phone: doc.phone
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