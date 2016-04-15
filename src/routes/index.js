"use strict";

var router = require('express').Router();

// users API
router.get('/', function (req, res) {
    res.render('index', {title: 'Project: __Techmagic Template__'})
});

module.exports = router;
