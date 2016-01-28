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
                client.query('SELECT email FROM users WHERE email = $1', email, function(result, err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        },

        // Function to insert a new user on database.
        insertNewUser: function(user) {
            return new Promise(function(resolve, reject) {
                client.query('INSERT INTO users(email, password, token) VALUES ($1, $2, $3) ', user, function(result, err) {
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

