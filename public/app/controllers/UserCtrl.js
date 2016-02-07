(function() {

    'use strict';

    // Created the controller to the dashboard view
    var UserCtrl = function($scope, userServices) {

        $scope.user = {};

        $scope.login = function() {
            if ($scope.userLogin === '' || $scope.userPassword === '') {
                // TODO: Show error
            } else {
                console.log($scope.user);
                userServices.login($scope.user)
                    .then(function() {
                        console.log("Login successful");
                    })
                    .catch(function() {
                        console.log("Login failed");
                    });
            }
        };

    };

    // Injecting modules used for better minifing later on
    UserCtrl.$inject = ['$scope', 'userServices'];

    // Enabling the controller in the app
    angular.module('fairdiving').controller('UserCtrl', UserCtrl);

}());

