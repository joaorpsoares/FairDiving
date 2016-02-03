(function() {

    'use strict';

    var database = require('../database/database'),
        validator = require('validator'),
        crypto = require('crypto'),
        email = require('../modules/email-module'),
        bcrypt = require('bcrypt-nodejs');


    // Definition of the routes related with authentication.
    module.exports = function(server) {

        // TODO: VERIFY COOKIE

        // Route to register a user
        server.post('/api/register', function(req, res) {

            if (validator.isEmail(req.body.email)) {
                if (!validator.matches(req.body.password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/))
                    res.status(406).send('Your password needs to have at least one capital letter, one small letter, one number and a have a size of 6 or more ');
                else {
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
                                                    email.sendWelcome(req.body.email, buf.toString('hex'))
                                                        .then(function(contact) {
                                                            // Send the message to the log file
                                                            console.log('@authRouter.js: Welcome e-mail sent to ' + contact);
                                                            res.status(200).send('OK');
                                                        })
                                                        .catch(function(err) {
                                                            console.log('@authRouter.js: Welcome e-mail not sent.');
                                                            res.status(200).send(err);
                                                        });
                                                })
                                                .catch(function(err) {
                                                    res.status(406).send(err);
                                                });
                                        }
                                    });
                                }
                            });
                        })
                        .catch(function(err) {
                            res.status(406).send(err);
                        });
                }
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

        // Route to check token
        server.get('/api/confirmation/:id', function(req, res) {

            database.updateActiveAtribute(req.params.id)
                .then(function() {
                    res.status(200).send('OK');
                })
                .catch(function(err) {
                    res.status(406).send(err);
                });
        });

    };

}());
