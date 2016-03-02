(function() {

    'use strict';

    var client,
        Promise = require('bluebird');

    module.exports = {

        // Function to connect this module to the main query client
        connect: function(mainClient) {
            client = mainClient;
        },

        // Function to insert a new package on database
        insertNewPackage: function(divePackage) {
            return new Promise(function(resolve, reject) {

                client.query('INSERT INTO packages (operatorID, package_type, title, price, description, certification, difficulty, n_dives, dive_sites, country_code) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id', divePackage, function(err, result) {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.rows[0]);
                    }
                });
            });
        },

        // Function to retrieve all packages from database
        getPackages: function() {
            return new Promise(function(resolve, reject) {
                client.query('SELECT * FROM packages', function(err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.rows);
                    }
                });
            });
        },

        // Function to retrieve a certain package from database
        getPackageID: function(id) {
            return new Promise(function(resolve, reject) {
                client.query('SELECT * FROM packages WHERE id = $1', id, function(err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.rows[0]);
                    }
                });
            });
        },

        // Function to retrieve package creator
        getPackageCreator: function(id) {
            return new Promise(function(resolve, reject) {
                client.query('SELECT operatorID FROM packages WHERE id = $1', id, function(err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.rows[0]);
                    }
                });
            });
        },

        // Function to insert a review to a package
        insertReviewOnPackage: function(review) {
            return new Promise(function(resolve, reject) {
                client.query('INSERT INTO reviews(title, rating, comment, packageid, userid) VALUES($1, $2, $3, $4, $5)', review, function(err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        },

        // Function to retrieve a all reviews from a certain package
        getReviewsByPackage: function(id) {
            return new Promise(function(resolve, reject) {
                client.query('SELECT title, comment, rating FROM reviews WHERE packageid = $1', id, function(err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.rows);
                    }
                });
            });
        },

        // Function to update a package imageID
        relateImagesToPackages: function(relation) {
            return new Promise(function(resolve, reject) {
                client.query('SELECT relateImagesToPackages($1, $2)', relation, function(err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        }


    };

}());
