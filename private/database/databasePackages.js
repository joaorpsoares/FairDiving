(function() {

    'use strict';

    var client,
        Promise = require('bluebird');

    module.exports = {

        // Function to connect this module to the main query client
        connect: function(mainClient) {
            client = mainClient;
        },

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
        }
    };

}());