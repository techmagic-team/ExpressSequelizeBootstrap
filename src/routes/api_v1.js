"use strict";

var router = require('express').Router();

var path = require('path');
var controller = require('require-all')(path.join(__dirname, "../controller"));
var middleware = require('require-all')(path.join(__dirname, "../middleware"));

// -------------------------------------------------------
// USER
// -------------------------------------------------------
router.get('/user',  controller.user.getAll);
router.post('/user', middleware.user.validateCreateUser, controller.user.create);

// -------------------------------------------------------
// AUTH
// -------------------------------------------------------
router.get('/me', middleware.auth.isAuthenticated, controller.auth.me);
// sign in
router.post('/auth', controller.auth.signin);



module.exports = router;
