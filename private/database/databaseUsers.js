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
        },

        // Function to retrieve a password of user
        getSensetiveData: function(email) {
            return new Promise(function(resolve, reject) {
                client.query('SELECT password,active,token FROM users WHERE email = $1', email, function(err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.rows);
                    }
                });
            });
        },

        // Function to update an active atribute
        updateActiveAtribute: function(token) {
            return new Promise(function(resolve, reject) {
                client.query('UPDATE users SET active = \'1\' WHERE token = $1', token, function(err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.rows);
                    }
                });
            });
        },

        // Function to retrieve a user clearence level of user
        retrieveUsrLevelByToken: function(token) {
            return new Promise(function(resolve, reject) {
                client.query('SELECT roles.description FROM roles,roles_users, users WHERE roles_users.roleid = roles.id AND roles_users.userid = users.id AND users.token = $1', token, function(err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.rows);
                    }
                });
            });
        },

        // Function to retrieve userID from token
        retrieveUsrIDByToken: function(token) {
            return new Promise(function(resolve, reject) {
                client.query('SELECT id FROM users WHERE token = $1', token, function(err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.rows[0].id);
                    }
                });
            });
        },

        // Function to insert a default level of a register user
        insertUsrLevel: function(usrId) {
            client.query('INSERT INTO roles_users(roleid, userid) VALUES($1,$2)', [2, usrId], function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        }
    };

}());
