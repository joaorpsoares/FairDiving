(function() {

    'use strict';

    // Created the services related to users
    var UserServices = function($http, $q, $cookies, $window, $location) {

        var deferred = $q.defer();

        this.login = function(user) {

            console.log(user);
            return $http.post('/api/login', user)
                .success(function(res) {

                    var now = new Date();

                    // Use cookie
                    $cookies.put('session', res, {
                        path: '/',
                        expires: user.remember ? new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()) : null
                    });

                    $window.location = '/profile';

                    deferred.resolve();
                })
                .error(function(err) {
                    console.log(err);
                    deferred.reject(err);
                });

        };
        this.register = function(user) {

            return $http.post('/api/register', user)
                .success(function(res) {
                    $window.location = '/login';
                    deferred.resolve();

                })
                .error(function(err) {
                    console.log(err);
                    deferred.reject(err);
                });

        };

        this.getLoggedUserToken = function() {

            return $http.get('/api/user/')
                .success(function(res) {
                    deferred.resolve(res);

                })
                .error(function(err) {
                    console.log(err);
                    deferred.reject(err);
                });


        };

        this.getLoggedUser = function(token) {
            return $http.get('/api/user/' + token)
                .success(function(res) {
                    deferred.resolve(res);

                })
                .error(function(err) {
                    console.log(err);
                    deferred.reject(err);
                });


        };

        this.forgetPassword = function(email) {
            return $http.post('/api/user/recover/', email)
                .success(function(res) {
                    deferred.resolve(res);
                })
                .error(function(err) {
                    console.log(err);
                    deferred.reject(err);
                });
        };


        this.resetPassword = function(reset) {

            var url = $location.url().split('/')[2].split('+');

            reset.email = url[0];
            reset.token = url[1];

            return $http.post('api/user/recover/confirmed', reset)
                .success(function(res) {
                    deferred.resolve(res);
                })
                .error(function(err) {
                    deferred.resolve(err);
                });
        };

        this.updateUserInfo = function(updatedUser) {
            return $http.post('/api/updateUser', updatedUser)
                .success(function(res) {
                    deferred.resolve(res);
                    $window.location = '/profile/';
                })
                .error(function(err) {
                    console.log(err);
                    deferred.reject(err);
                });


        };

        this.logout = function() {
            $cookies.remove('session', {
                path: '/'
            });

            $window.location.href = '/';


        };
    };

    // Injecting modules used for better minifing later on
    UserServices.$inject = ['$http', '$q', '$cookies', '$window', '$location'];

    // Enabling the service in the app
    angular.module('fairdiving').service('UserServices', UserServices);

}());
