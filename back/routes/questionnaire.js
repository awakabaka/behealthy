const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Patient = require('../models/patient');
const Questionnaire = require('../models/questionnaire')


router.get('/', (req, res, next) => {
    Questionnaire.find()
        .select('_id patientId cry localizationOfSwearing smellOfSwearing frequenceOfUrination colorOfUrination' +
            'faces frequenceOfFaces colorOfFaces feed typeFeed breath est skin')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                visits: docs.map(doc => {
                    return {
                        _id: doc._id,
                        patientId: doc.patientId,
                        cry: doc.cry,
                        localizationOfSwearing: doc.localizationOfSwearing,
                        smellOfSwearing: doc.smellOfSwearing,
                        frequenceOfUrination: doc.frequenceOfUrination,
                        colorOfUrination: doc.colorOfUrination,
                        faces: doc.faces,
                        frequenceOfFaces: doc.frequenceOfFaces,
                        colorOfFaces: doc.colorOfFaces,
                        feed: doc.feed,
                        typeFeed: doc.typeFeed,
                        breath: doc.breath,
                        skin: doc.skin,
                        evaluation: doc.evaluation,
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

router.post('/', (req, res, next) => {
    Patient.findById(req.body.patientId)
        .then(user => {
            if (!user) {
                res.status(404).json({
                    message: "Patient not found!"
                })
            }
            const questionnaire = new Questionnaire({
                _id: mongoose.Types.ObjectId(),
                patientId: req.body.patientId,
                cry: req.body.cry,
                localizationOfSwearing: req.body.localizationOfSwearing,
                smellOfSwearing: req.body.smellOfSwearing,
                frequenceOfUrination: req.body.frequenceOfUrination,
                colorOfUrination: req.body.colorOfUrination,
                faces: req.body.faces,
                frequenceOfFaces: req.body.frequenceOfFaces,
                colorOfFaces: req.body.colorOfFaces,
                feed: req.body.feed,
                typeFeed: req.body.typeFeed,
                breath: req.body.breath,
                skin: req.body.skin,
                time: req.body.time,
                ast: req.body.ast
            });
            return questionnaire
                .save()
                .then(result => {
                    console.log(result);
                    res.status(200).json({
                        result: result,
                        message: "New anket add",
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.get('/last/:patientId', (req, res, next) => {
    Questionnaire.find({"patientId": req.params.patientId})
        .sort({'_id':-1})
        .limit(1)
        .exec()
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    message: 'Questionnaire not found'
                });
            }
            res.status(200).json({
                questionnaire: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.get('/:patientId', (req, res, next) => {
    Questionnaire.find({"patientId": req.params.patientId})
        .sort({'_id':-1})
        .exec()
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    message: 'Questionnaire not found'
                });
            }
            res.status(200).json({
                questionnaire: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

module.exports = router;