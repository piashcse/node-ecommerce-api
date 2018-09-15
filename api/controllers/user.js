
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.user_signup = (req, res, next) => {

    User.find({
        email: req.body.email
    }).exec().then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'Email exits'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, has) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: has
                    });
                    user.save().then(result => {
                        console.log(result);
                        return res.status(201).json({
                            message: 'User created'
                        })
                    }).catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                }
            });
        }
    }).catch();
}


exports.user_login = (req, res, next) => {
    User.find({
            email: req.body.email
        })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }

            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }

                if (result) {

                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, process.env.JWT_KEY, {
                        expiresIn: '1h'
                    })

                    return res.status(200).json({
                        message: 'Auth successfull',
                        token: token
                    });
                }

                return res.status(401).json({
                    message: 'Auth failed'
                });
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.user_delete = (req, res, next) => {
    User.remove({
            _id: req.body.userId
        })
        .exec()
        .then(result => {
            return res.status(200).json({
                message: 'User deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}