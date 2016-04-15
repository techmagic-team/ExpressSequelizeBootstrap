"use strict";
var fs = require("fs");
var path = require("path");
var util = require('require-all')(path.join(__dirname, "../util"));

var db = {};

fs
    .readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach( (file) => {
        var model = util.main.sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

//db.sequelize = sequelize;
//db.Sequelize = Sequelize;

module.exports = db;
