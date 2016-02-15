(function() {

    'use strict';

    // Created the controller to the package view
    var PkgCtrl = function($scope, PkgServices) {

        $scope.packages = {};

        $scope.packageOnUse = {};

        $scope.getPackageID = function(Id) {
            if (Id === '') {
                // TODO: Show error
            } else {
                pkgServices.getPackageID(Id)
                    .then(function() {
                        console.log("getPackageID successful");
                    })
                    .catch(function() {
                        console.log("getPackageID failed");
                    });
            }
        };


    };

    // Injecting modules used for better minifing later on
    PkgCtrl.$inject = ['$scope', 'PkgServices'];

    // Enabling the controller in the app
    angular.module('fairdiving').controller('PkgCtrl', PkgCtrl);

}());
