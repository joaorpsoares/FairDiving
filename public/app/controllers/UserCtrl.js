(function() {

    'use strict';

    // Created the controller to the user view
    var UserCtrl = function($scope, UserServices) {

        $scope.user = {};
        $scope.errorMessage = "";

        $scope.login = function() {
            if ($scope.user.email === '' || $scope.user.password === '') {
                // TODO: Show error
            } else {
                UserServices.login($scope.user)
                    .then(function() {
                        $scope.errorMessage = "";
                        console.log("Login successful");
                    })
                    .catch(function(err) {
                        $scope.errorMessage = err.data;
                        console.log("Login failed");
                    });
            }
        };


        $scope.register = function() {
            console.log($scope.user);
            if ($scope.user.email === '' || $scope.user.password === '' || $scope.user.confirmPassword === '') {
                $scope.errorMessage = "Email and passwords fields cannot be empty.";
            } else {
                UserServices.register($scope.user)
                    .then(function() {
                        $scope.errorMessage = "";
                        console.log("Register successful");
                    })
                    .catch(function(err) {
                        $scope.errorMessage = err.data;
                        console.log("Register failed");
                    });
            }
        };


    };

    // Injecting modules used for better minifing later on
    UserCtrl.$inject = ['$scope', 'UserServices'];

    // Enabling the controller in the app
    angular.module('fairdiving').controller('UserCtrl', UserCtrl);

}());
