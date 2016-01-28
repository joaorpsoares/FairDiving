(function() {

    'use strict';

    var database = require('../database/database'),
        validator = require('validator');

    // Definition of the routes related with authentication.
    module.exports = function(server) {

        // TODO: VERIFY COOKIE

        // Route to register a user
        server.post('/api/register', function(req, res) {

            if (validator.isEmail(req.body.email)) {

                database.checkExistence(req.body.email)
                    .then(function() {
                        // TODO: crypto, send email
                    })
                    .catch(function(err) {
                        console.log(err);
                        res.status(200).send(err);
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

