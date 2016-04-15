"use strict";

var path = require('path');
var UserDao = require('../dao/user');

exports.getAll = function (req, res) {
    UserDao.get().then((users) => {
        res.status(200).json(users);
    });
};

exports.create = function (req, res) {
    var data = req.body;
    UserDao.create(data).then(user => {
        res.status(200).json(user);
    }).catch(err => {
        console.log("err", err);
        res.status(err.status).send(err);
    });
};