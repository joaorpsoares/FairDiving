(function() {

    'use strict';

    // Creation of the app, named 'fairdiving'
    var app = angular.module('fairdiving', ['ngRoute', 'ngCookies', 'ngFileUpload']);

    app.config(function($routeProvider, $locationProvider) {

        // Definition of the view routes
        $routeProvider
            .when('/', {
                // controller: 'UserCtrl',
                templateUrl: 'app/views/home.ejs'
            })
            .when('/login', {
                controller: 'UserCtrl',
                templateUrl: 'app/views/login.ejs'
            })
            .when('/register', {
                controller: 'UserCtrl',
                templateUrl: 'app/views/register.ejs'
            })
            .when('/forbidden', {
                templateUrl: 'app/views/forbidden.ejs'
            })
            .when('/package', {
                controller: 'PkgCtrl',
                templateUrl: 'app/views/package.ejs'
            })
            .when('/package/:id', {
                controller: 'PkgCtrl',
                templateUrl: 'app/views/package.ejs'
            })
            .when('/profile', {
                controller: 'PkgCtrl',
                templateUrl: 'app/views/profile.ejs'
            })
            .when('/listpackages', {
                controller: 'PkgCtrl',
                templateUrl: 'app/views/listpackages.ejs'
            })
            .when('/resetPassword/:rest', {
                controller: 'UserCtrl',
                templateUrl: 'app/views/newPassword.ejs'
            })
            .otherwise({
                redirectTo: '/'
            });

        // Enabling HTML5 mode so that the URL doesn't show up with hashtags
        $locationProvider.html5Mode(true);

    });

}());
