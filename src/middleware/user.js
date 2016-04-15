"use strict";

var Joi = require('joi');
var UserDao = require('../dao/user');

exports.validateCreateUser = function (req, res, next) {
    var schema = Joi.object().keys({
        firstName: Joi.string().alphanum().min(2).max(100).required(),
        lastName: Joi.string().alphanum().min(2).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().min(6).max(30).required()
    });

    Joi.validate(req.body, schema, (err, value) => {
        if(err){
            return res.status(400).send(err);
        }

        //validate if the email is unique
        UserDao.getByEmail(value.email).then(user => {
            if (user) {
                return res.status(403).send("User with this email already exists");
            }

            req.body = value;
            next();
        });

    });
};