"use strict";

var UserDao = require('../dao/user');
var path = require("path");
var util = require('require-all')(path.join(__dirname, "../util"));

exports.me = function (req, res) {
    res.status(200).json(req.user);
};

exports.signin = function (req, res) {
    var data = req.body;

    UserDao.getByEmail(data.email).then(user => {
        if(!user){
            return res.status(403).send("incorrect credentials");
        }

        user.comparePassword(data.password, (err, result)=> {
            if(!result){
                return res.status(403).send("incorrect credentials");
            }

            var token = util.authToken.createAuthToken(user);
            res.status(200).json({token: token});
        })

    });
};