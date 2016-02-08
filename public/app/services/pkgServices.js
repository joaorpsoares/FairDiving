(function() {

    'use strict';

    // Created the services related to packages
    var pkgServices = function($http, $q, $cookies, $window) {

        var deferred = $q.defer();

        this.getPackageID = function(Id) {

            return $http.get('/api/package/' + Id)
                .success(function(res) {
                    deferred.resolve();

                })
                .error(function(err) {
                    deferred.reject(err);
                });

        };
       
    };

    // Injecting modules used for better minifing later on
    pkgServices.$inject = ['$http', '$q', '$cookies', '$window'];

    // Enabling the service in the app
    angular.module('fairdiving').service('pkgServices', pkgServices);

}());