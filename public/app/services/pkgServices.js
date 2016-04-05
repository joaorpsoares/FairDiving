(function() {

    'use strict';

    // Created the services related to packages
    var pkgServices = function($http, $q, $cookies, $window) {

        var deferred = $q.defer();

        this.getPackages = function() {

            return $http.get('/api/package')
                .success(function(res) {
                    deferred.resolve(res);
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };

        this.getPackageID = function(Id) {

            return $http.get('/api/package/' + Id)
                .success(function(res) {
                    deferred.resolve(res);
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };

        this.getPackagesOfLoggedUser = function() {

            return $http.get('/api/myPackages')
                .success(function(res) {
                    deferred.resolve(res);
                })
                .error(function(err) {
                    console.log(err);
                    deferred.reject(err);
                });
        };

        this.insertNewPackage = function(newPackage) {

            var fd = new FormData();
            fd.append('avatar', newPackage.avatar);
            fd.append('title', newPackage.title);
            fd.append('package_type', newPackage.package_type);
            fd.append('currency', newPackage.currency);
            fd.append('price', newPackage.price);
            fd.append('certification', newPackage.certification);
            fd.append('dive_sites', newPackage.dive_sites);
            fd.append('n_dives', newPackage.n_dives);
            fd.append('description', newPackage.description);
            fd.append('country_code', newPackage.country_code);

            return $http.post('/api/package/', fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    },
                    enctype: 'multipart/form-data'
                })
                .success(function(res) {
                    $window.location = '/package/' + res.id;
                    deferred.resolve(res);
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };

        this.getCountries = function() {
            return $http.get('/api/countries')
                .success(function(res) {
                    deferred.resolve(res);
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };



        this.insertNewReview = function(id, review) {

            return $http.post('/api/package/review/' + id, review)
                .success(function(res) {
                    $window.location = '/package/' + id;
                    deferred.resolve(res);
                })
                .error(function(err) {
                    deferred.reject(err);
                });

        };

        this.getReviews = function(id) {

            return $http.get('/api/package/' + id + '/reviews')
                .success(function(res) {
                    deferred.resolve(res);
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };


        this.getPackageImage = function(id) {
            return $http.get('/api/package/image/' + id)
                .success(function(res) {
                    deferred.resolve(res.data);
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };

        /*this.getUserID = function(Id) {

            return $http.get('/api/userw/' + Id)
                .success(function(res) {
                    deferred.resolve(res);
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };*/
    };

    // Injecting modules used for better minifing later on
    pkgServices.$inject = ['$http', '$q', '$cookies', '$window'];

    // Enabling the service in the app
    angular.module('fairdiving').service('pkgServices', pkgServices);

}());
