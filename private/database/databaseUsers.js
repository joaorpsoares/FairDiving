(function() {

    'use strict';

    var client,
        Promise = require('bluebird');

    module.exports = {

        // Function to connect this module to the main query client
        connect: function(mainClient) {
            client = mainClient;
        },

        // Function to check if there is already a user
        checkExistence: function(email) {
            return new Promise(function(resolve, reject) {
                client.query('SELECT email FROM users WHERE email = $1', email, function(err, result) {
                    if (err) {
                        reject(err);
                    } else {

                        if (result.rows.length === 0) {
                            resolve();
                        } else {
                            reject('This email already on our database.');
                        }
                    }
                });
            });
        },

        // Function to insert a new user on database.
        insertNewUser: function(user) {
            return new Promise(function(resolve, reject) {
                client.query('INSERT INTO users(email, password, token) VALUES ($1, $2, $3) ', user, function(err, result) {
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

