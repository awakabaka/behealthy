const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const Admin = require('../models/admin')

router.get('/', (req, res, next) => {
    Admin.find()
        .select('email password')
        .exec()
        .then(docs => {
            res.status(200).json({
                parent: docs.map(doc => {
                    return {
                        email: doc.email,
                        password: doc.password
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
    Admin.find({ "email": req.body.email })
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
                        const parent = new Admin({
                            _id: mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
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
    Admin.find({ "email": req.body.email })
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


module.exports = router;