"use strict";


exports.notFound = function (message) {
    return {
        status: 404,
        message: message
    };
};

exports.forbidden = function (message) {
    return {
        status: 403,
        message: message
    };
};

exports.unathorized = function (message) {
    return {
        status: 401,
        message: message
    };
};

exports.badRequest = function (message) {
    return {
        status: 400,
        message: message
    };
};

exports.serverError = function (message) {
    return {
        status: 500,
        message: message
    };
};