(function() {

    'use strict';

    // Created the services related to users
    var userServices = function($http, $q, $cookies, $window) {

        var deferred = $q.defer();

        this.login = function(user) {

            return $http.post('/api/login', user)
                .success(function(res) {
                    deferred.resolve();

                })
                .error(function(err) {
                    deferred.reject(err);
                });

        };
        this.register = function(user) {

            return $http.post('/api/register', user)
                .success(function(res) {
                    deferred.resolve();

                })
                .error(function(err) {
                    deferred.reject(err);
                });

        };
    };

    // Injecting modules used for better minifing later on
    userServices.$inject = ['$http', '$q', '$cookies', '$window'];

    // Enabling the service in the app
    angular.module('fairdiving').service('userServices', userServices);

}());
