"use strict";

var Promise = require('bluebird');
var path = require('path');
var jwt =  require('jsonwebtoken');
var util = require('require-all')(path.join(__dirname, "../util"));

exports.createAuthToken = function (user) {
    var tokenSecret = util.main.config.tokenSecret;
    var tokenPayload = {
        userId: user.id
    };
    return jwt.sign(tokenPayload, tokenSecret, {
        expiresIn: 86400 // expires in 24 hours
    });
};


exports.extractAuthToken = function (token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, util.main.config.tokenSecret, (err, decoded) => {
            if (err) {
                return reject(err)
            }
            resolve(decoded);
        });
    });
};