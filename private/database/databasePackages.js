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
<<<<<<< HEAD
                client.query('INSERT INTO packages (operatorID, imageID, title, price, description, certification, difficulty, n_dives, dive_sites, country_code) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id', divePackage, function(err, result) {
=======
                client.query('INSERT INTO packages (certification, difficulty, dive_sites, title, price, description) VALUES($1, $2, $3, $4, $5, $6) RETURNING id', divePackage, function(err, result) {
>>>>>>> 2fba66bf04ad4b2cd4e06bae147157c160159e7a
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

        // Function to retrieve a all reviews from a certain package
        getReviewsByPackage: function(id) {
            return new Promise(function(resolve, reject) {
                client.query('SELECT * FROM reviews WHERE packageid = $1', id, function(err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.rows);
                    }
                });
            });
        },

        // Function to update a package imageID
        updateImageIDPackage: function(info) {
            return new Promise(function(resolve, reject) {
                client.query('UPDATE packages SET imageID = $1 WHERE id = $2', info, function(err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.rows);
                    }
                });
            });
        }


    };

}());
