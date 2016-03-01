(function() {

    'use strict';

    var database = require('../database/database'),
        validator = require('validator'),
        cookie = require('../modules/token-module'),
        Transaction = require('pg-transaction'),
        multer = require('multer'),
        storage = multer.diskStorage({
            destination: function(req, file, cb) {
                cb(null, 'images/packages/');
            },
            filename: function(req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now());
            }
        }),
        upload = multer({ storage: storage });

    // Definition of the routes related with packages.
    module.exports = function(server) {

        // Route to insert a new package
        server.post('/api/package', upload.array('avatar'), function(req, res) {
            cookie.verifySession(req.cookies.session)
                .then(function(info) {
                    if (info.role === "OPERATOR" || info.role === "ADMIN") {
                        database.retrieveUsrIDByToken(info.token)
                            .then(function(usrID) {

                                var __package = {
                                    operatorID: usrID,
                                    title: req.body.title,
                                    price: req.body.price,
                                    description: req.body.description,
                                    certification: req.body.certification,
                                    difficulty: req.body.difficulty,
                                    n_dives: req.body.n_dives,
                                    dive_sites: req.body.dive_sites,
                                    country_code: req.body.country_code
                                };

                                if (!__package.title || !__package.price || !__package.description || !__package.country_code) {
                                    res.status(406).send("error");
                                } else {
                                    if (__package.title.length > 140) {
                                        res.status(406).send('Title has too many characters.');
                                    } else if (__package.price < 0) {
                                        res.status(406).send('Price must be above 0');
                                    } else if (__package.description.length > 500) {
                                        res.status(406).send('Description has too many characters');
                                    } else {

                                        var _imageNames = [];

                                        req.files.forEach(function(value) {
                                            _imageNames.push(value.filename);
                                        });

                                        var __transaction = new Transaction(database.getClient());

                                        __transaction.on('error', function(err) {
                                            if (err) throw err;
                                        });
                                        __transaction.begin();
                                        __transaction.savepoint('_beforeInsertUser');


                                        database.insertNewPackage(Object.keys(__package).map(function(key) {
                                                return __package[key];
                                            }))
                                            .then(function(packageID) {

                                                database.relateImagesToPackages(packageID.id, _imageNames)
                                                    .then(function() {
                                                        __transaction.commit();
                                                        res.status(200).send('OK');
                                                    })
                                                    .catch(function(err) {
                                                        __transaction.rollback("_beforeInsertUser");
                                                        res.status(406).send("Images were not uploaded.");
                                                    });
                                            })
                                            .catch(function(err) {
                                                console.log(err);
                                                res.status(406).send(err);
                                            });
                                    }
                                }

                            })
                            .catch(function(err) {
                                res.status(406).send(err);
                            });
                    } else {
                        res.status(406).send("Impossible to do this, since you dont have permission.");
                    }
                })
                .catch(function(err) {
                    console.log(err);
                    res.status(406).send("You are not allowed to create packages. If you think it is a mistake, contact our support.");
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
