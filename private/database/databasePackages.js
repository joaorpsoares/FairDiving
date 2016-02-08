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
                client.query('INSERT INTO packages (operatorID, imageID, title, price, description, country_code) VALUES($1, $2, $3, $4, $5, $6) RETURNING id', divePackage, function(err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        console.log("Package created:", result.rows);
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
                        console.log("List of packages retrieved was deliver successful")
                        resolve(result);
                    }
                })
            });
        },

        // Function to retrieve a certain package from database
        getPackageID: function(id) {
            return new Promise(function(resolve, reject) {
                client.query('SELECT * FROM packages WHERE id = $1', id, function(err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        console.log("List of packages retrieved was deliver successful")
                        resolve(result);
                    }
                })
            });
        }
    };

}());

