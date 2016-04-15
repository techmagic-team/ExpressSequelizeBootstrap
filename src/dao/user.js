"use strict";

var Promise = require('bluebird');
var model = require('../model');
var path = require('path');
var util = require('require-all')(path.join(__dirname, "../util"));

exports.get = function () {
    return new Promise((resolve) => {
        model.User.findAll({order: 'email ASC'}).then((users) => {
            resolve(users);
        });
    });
};

exports.getByEmail = function (email) {
    return new Promise((resolve) => {
        model.User.findOne({where: {email: email}}).then((user) => {
            resolve(user);
        });
    });
};


exports.getById = function (id) {
    return new Promise((resolve) => {
        model.User.findOne({where: {id: id}}).then((user) => {
            resolve(user);
        });
    });
};


exports.create = function (data) {
    return new Promise((resolve, reject) => {
        model.User.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
        }).then((user) => {
            resolve(user);

        }).catch((error) => {
            reject(util.error.serverError(error))
        });
    });
}
