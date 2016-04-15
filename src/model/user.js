"use strict";

var bcrypt = require('bcrypt-nodejs');

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 100]
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 100]
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [6, 100],
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [5, 100]
            }
        }
    }, {

        instanceMethods: {
            comparePassword: function (password, cb) {
                if (this.password) {
                    bcrypt.compare(password.toString(), this.password.toString(), cb);
                } else {
                    return cb(null, false);
                }
            }
        },

        hooks: {
            beforeCreate: function (user, options, next) {
                if (!user.password) return next();

                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(user.password, salt, null, function (err, hash) {
                        if (err) {
                            next(err);
                        } else {
                            user.password = hash;
                            next();
                        }
                    });
                });
            }
        }
    });

    return User;
};
