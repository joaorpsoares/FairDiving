(function() {

    'use strict';
    var pg = require('pg'),
        Promise = require('bluebird'),
        database = require('../developer/secrets/database'),
        conString = 'postgres://' + database.user + ':' + database.password + '@' + database.url + ':' + database.port + '/' + database.database,
        client = new pg.Client(conString),

        // database modules
        databaseUsers = require('./databaseUsers'),
        databasePackages = require('./databasePackages');

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
                        databasePackages.connect(client);
                        resolve();
                    }
                });
            });
        },

        // Function to disconnect the database from the server. Shouldn't be called.
        disconnect: function() {
            client.disconnect();
        },

        // Function to get client variable
        getClient: function() {
            return client;
        },

        /*
                USER RELATED FUNCTIONS
        */

        // Function to check existence of a specific user
        checkExistence: function(email) {
            return databaseUsers.checkExistence([email]);
        },

        // Function to check if an email exists
        checkEmailExistance: function(email) {
            return databaseUsers.checkEmailExistance([email]);
        },

        // Function to insert a new user on database
        insertNewUser: function(user) {
            return databaseUsers.insertNewUser(user);
        },

        // Function to get sensetive data of a user
        getSensetiveData: function(email) {
            return databaseUsers.getSensetiveData([email.toLowerCase()]);
        },

        // Function to update active atribute
        updateActiveAtribute: function(token) {
            return databaseUsers.updateActiveAtribute([token]);
        },

        // Function to retrieve a clearance level from a token
        retrieveUsrLevelByToken: function(token) {
            return databaseUsers.retrieveUsrLevelByToken([token]);
        },

        // Function to retrieve an userID using only token
        retrieveUsrIDByToken: function(token) {
            return databaseUsers.retrieveUsrIDByToken([token]);
        },

        retrieveUsrByToken: function(token) {
            return databaseUsers.retrieveUsrByToken([token]);
        },

        retrieveUsrById: function(id) {
            return databaseUsers.retrieveUsrById(id);
        },

        updateUsrByID: function(user) {
            return databaseUsers.updateUsrByID(user);
        },

        // Function to insert a default role on registered people
        insertUsrLevel: function(usrId) {
            return databaseUsers.insertUsrLevel(usrId);
        },

        // Function to refresh token
        refreshToken: function(token, email) {
            return databaseUsers.refreshToken([token, email]);
        },

        // Function to update password
        updatePassword: function(newpassword, email) {
            return databaseUsers.updatePassword([newpassword, email]);
        },

        /*
                PACKAGE RELATED FUNCTIONS
        */

        // Function to insert a new package
        insertNewPackage: function(divePackage) {
            return databasePackages.insertNewPackage(divePackage);
        },

        // Function to retrieve all packages
        getPackages: function() {
            return databasePackages.getPackages();
        },

        // Function to retrieve a certain package
        getPackageID: function(id) {
            return databasePackages.getPackageID([id]);
        },

        // Function to retrive all images from a certain package
        getPackageImage: function(id) {
            return databasePackages.getPackageImage([id]);
        },

        getPackagesByOperator: function(operatorID) {
            return databasePackages.getPackagesByOperator([operatorID]);
        },

        // Function to retrieve package creator
        getPackageCreator: function(id) {
            return databasePackages.getPackageCreator([id]);
        },

        // Function to retrieve a all reviews from a certain package
        getReviewsByPackage: function(id) {
            return databasePackages.getReviewsByPackage([id]);
        },

        // Function to update a package imageID
        relateImagesToPackages: function(idPackage, imageNames) {
            return databasePackages.relateImagesToPackages([imageNames, idPackage]);
        },

        // Function to insert a review to a package
        insertReviewOnPackage: function(review) {
            return databasePackages.insertReviewOnPackage(review);
        },

        // Function to get all countries
        getCountries: function() {
            return databasePackages.getCountries();
        }
    };

}());
