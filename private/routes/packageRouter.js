(function() {

    'use strict';

    var database = require('../database/database'),
        validator = require('validator'),
        cookie = require('../modules/token-module'),
        multer = require('multer'),
        upload = multer({ dest: 'images/packages/' });

    // Definition of the routes related with packages.
    module.exports = function(server) {

        // Route to insert a new package
        server.post('/api/package', upload.array('avatar'), function(req, res) {
            cookie.verifySession(req.cookies.session)
                .then(function(info) {
                    console.log(info);
                    if (info.role === "OPERATOR" || info.role === "ADMIN") {
                        database.retrieveUsrIDByToken(info.token)
                            .then(function(usrID) {

                                console.log(req.body);
                                var __package = {
                                    operatorID: usrID,
                                    imageID: 1, // Default one
                                    title: req.body.title,
                                    price: req.body.price,
                                    description: req.body.description,
                                    country_code: req.body.country_code
                                };

                                if (!__package.imageID || !__package.title || !__package.price || !__package.description || !__package.country_code) {
                                    res.status(406).send("error");
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
                                            .then(function(packageID) {
                                                console.log(packageID);
                                                console.log(upload);
                                                res.status(200).send('OK');
                                            })
                                            .catch(function(err) {
                                                res.status(406).send(err);
                                            });
                                    }
                                }

                            })
                            .catch(function(err) {
                                console.log(err);
                                res.status(406).send(err);
                            });
                    } else {
                        res.status(406).send("Impossible to do this, since you dont have permission.");
                    }
                })
                .catch(function(err) {
                    console.log(err);
                    res.status(406).send("You are not allowed to use this");
                });
        });

        // Route to get all packages from database
        server.get('/api/package', function(req, res) {
            database.getPackages()
                .then(function(packs) {
                    res.status(200).send(packs);
                })
                .catch(function(err) {
                    res.status(406).send('It was impossible to retrieve the packages.');
                });
        });

        // Route to get a unique package informaton
        server.get('/api/package/:id', function(req, res) {
            database.getPackageID(req.params.id)
                .then(function(result) {
                    res.status(200).send(result);
                })
                .catch(function(err) {
                    res.status(406).send(err);
                });
        });

        // Route to get a all reviews informaton from a certain package
        server.get('/api/package/:id/reviews', function(req, res) {
            database.getReviewsByPackage(req.params.id)
                .then(function(result) {
                    res.status(200).send(result);
                })
                .catch(function(err) {
                    res.status(406).send(err);
                });
        });
    };

}());
