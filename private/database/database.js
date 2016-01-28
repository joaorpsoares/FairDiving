(function() {

    'use strict';
    var pg = require('pg'),
        Promise = require('bluebird'),
        database = require('../developer/secrets/database'),
        conString = 'postgres://' + database.user + ':' + database.password + '@' + database.url + ':' + database.port + '/' + database.database,
        client = new pg.Client(conString),

        // database modules
        databaseUsers = require('./databaseUsers');

    module.exports = {

        // Function called in the start of the server to connect to the database
        connect: function() {
            return new Promise(function(resolve, reject) {
                client.connect(function(err) {
                    if (err) {
                        reject(err);
                    } else {

                        // Connect to other database modules
                        databaseUsers.connect(client);
                        resolve();
                    }
                });
            });
        },

        // Function to disconnect the database from the server. Shouldn't be called.
        disconnect: function() {
            client.disconnect();
        },

        // Function to check existence of a specific user
        checkExistence: function(email) {
            return databaseUsers.checkExistence([email]);
        },

        // Function to insert a new user on database
        insertNewUser: function(user) {
            return databaseUsers.insertNewUser(user);
        }
    };

}());

