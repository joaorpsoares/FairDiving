(function() {

    'use strict';

    var database = require('../database/database'),
        validator = require('validator'),
        crypto = require('crypto'),
        bcrypt = require('bcrypt-nodejs');

    // Definition of the routes related with authentication.
    module.exports = function(server) {

        // TODO: VERIFY COOKIE

        // Route to register a user
        server.post('/api/register', function(req, res) {

            if (validator.isEmail(req.body.email)) {

                database.checkExistence(req.body.email)
                    .then(function() {
                        // TODO: crypto, send email
                        crypto.randomBytes(32, function(err, buf) {
                            if (err) {
                                res.status(406).send(err);
                            } else {

                                bcrypt.hash(req.body.password, null, null, function(err, hash) {

                                    if (err) {
                                        res.status(406).send(err);
                                    } else {

                                        var user = [req.body.email, hash, buf.toString('hex')];

                                        database.insertNewUser(user)
                                            .then(function() {
                                                res.status(200).send('OK');
                                            })
                                            .catch(function(err) {
                                                res.status(406).send('Not OK');
                                            });
                                    }
                                });
                            }
                        });
                    })
                    .catch(function(err) {
                        res.status(406).send(err);
                    });
            } else {
                res.status(400).send('The email that was given is not valid.');
            }
        });

        // Route to verify the login
        server.post('/api/login', function(req, res) {
            if (validator.isEmail(req.body.email)) {
                database.getSensetiveData(req.body.email)
                    .then(function(result) {
                        if (result.length > 0) {
                            if (!result[0].active) res.status(406).send('You need to complete the registration before login. Check you email.');
                            else {
                                bcrypt.compare(req.body.password, result[0].password, function(err, result) {
                                    if (err) {
                                        res.status(406).send(err);
                                    } else {
                                        if (result)
                                            res.status(200).send('OK');
                                        else
                                            res.status(406).send('Email or password not correct.');
                                    }
                                });
                            }
                        } else {
                            res.status(406).send(err);
                        }
                    })
                    .catch(function(err) {
                        res.status(406).send(err);
                    });
            } else {
                res.status(406).send('Sorry! This email does not exist!');
            }
        });

    };

}());

