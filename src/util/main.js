"use strict";
var Sequelize = require("sequelize");

var env = process.env.NODE_ENV || "development";
var config = require('../config/config.json')[env];

var sequelize = new Sequelize(config.database, config.username, config.password, config);


module.exports = {
    config: config,
    sequelize: sequelize
};