(function() {

    'use strict';

    // Created the controller to the dashboard view
    var UserCtrl = function($scope, userServices) {

        $scope.user = {};

        $scope.login = function() {
            if ($scope.user.email === '' || $scope.user.password === '') {
                // TODO: Show error
            } else {
                userServices.login($scope.user)
                    .then(function() {
                        console.log("Login successful");
                    })
                    .catch(function() {
                        console.log("Login failed");
                    });
            }
        };

        $scope.register = function() {
            console.log($scope.user);
            if ($scope.user.email === '' || $scope.user.password === '' || $scope.user.confirmPassword === '') {
                // TODO: Show error 
            } else {
                userServices.register($scope.user)
                    .then(function() {
                        console.log("Register successful");
                    })
                    .catch(function() {
                        console.log("Register failed");
                    });
            }
        };

    };

    // Injecting modules used for better minifing later on
    UserCtrl.$inject = ['$scope', 'userServices'];

    // Enabling the controller in the app
    angular.module('fairdiving').controller('UserCtrl', UserCtrl);

}());
