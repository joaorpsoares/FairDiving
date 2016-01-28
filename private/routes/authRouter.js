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
                                reject(err);
                            } else {

                                bcrypt.hash(req.body.password, null, null, function(err, hash) {

                                    if (err) {
                                        reject(err);
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

        });

    };

}());

