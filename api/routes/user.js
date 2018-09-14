const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.post('/singup', (req, res, next) => {
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
            user.save().then(result =>{
                return res.status(201).json({
                    message:'User created'
                })
            }).catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
        }
    });
});

module.exports = router;