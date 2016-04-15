"use strict";
var path = require('path');
var util = require('require-all')(path.join(__dirname, "../util"));
var UserDao = require('../dao/user');

exports.isAuthenticated = function (req, res, next) {
    var token = req.headers.authorization;
    if (!token) {
        return res.status(401).end();
    }

    util.authToken.extractAuthToken(token).then(decoded => {
        if (!decoded || !decoded.userId) {
            return res.status(403).end();
        }

        UserDao.getById(decoded.userId).then(user => {
            req.user = user;
            next();
        });
    }).catch(error => {
        return res.status(401).end();
    });
};