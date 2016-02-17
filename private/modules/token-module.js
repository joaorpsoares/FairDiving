(function() {

    'use strict';

    var jwt = require('jsonwebtoken'),
        Promise = require('bluebird'),
        secret = require('../developer/secrets/token.json'),
        database = require('../database/database');

    var self = module.exports = {

        sign: function(obj) {
            return new Promise(function(resolve, reject) {
                resolve(jwt.sign(obj, secret.token_jwt_secret));
            });
        },

        verify: function(token) {
            return new Promise(function(resolve, reject) {
                jwt.verify(token, secret.token_jwt_secret, function(err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        },

        verifySession: function(token) {
            return new Promise(function(resolve, reject) {
                self.verify(token)
                    .then(function(_token) {
                        database.retrieveUsrLevelByToken(_token)
                            .then(function(level) {
                                resolve({ token: _token, role: level[0].description });
                            })
                            .catch(function(err) {
                                reject(err);
                            });
                    }).catch(function(err) {
                        reject('Failed to verify session');
                    });
            });
        }
    };

}());
