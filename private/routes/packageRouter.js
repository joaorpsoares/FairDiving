(function() {

    'use strict';

    var database = require('../database/database'),
        validator = require('validator');

    // Definition of the routes related with packages.
    module.exports = function(server) {

        // TODO: VERIFY COOKIE

        // Route to insert a new package
        server.post('/api/package', function(req, res) {
            var __package = {
                operatorID: 1,
                imageID: req.body.imageID,
                title: req.body.title,
                price: req.body.price,
                description: req.body.description,
                country_code: req.body.country_code
            };

            if (!__package.imageID || !__package.title || !__package.price || !__package.description || !__package.country_code) {
                res.status(406).send(err);
            } else {
                if (__package.title.length > 140) {
                    res.status(406).send('Title has too many characters.');
                } else if (__package.price < 0) {
                    res.status(406).send('Price must be above 0');
                } else if (__package.description.length > 500) {
                    res.status(406).send('Description has too many characters');
                } else {
                    database.insertNewPackage(Object.keys(__package).map(function(key) {
                            return __package[key];
                        }))
                        .then(function() {
                            res.status(200).send('OK');
                        })
                        .catch(function(err) {
                            res.status(406).send(err);
                        })
                }
            }

        });
    };

}());