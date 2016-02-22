(function() {

    'use strict';

    // Created the controller to the package view
    var PkgCtrl = function($scope, pkgServices, $routeParams) {

        $scope.packages = {};
        $scope.packageOnUse = {
            Id: $routeParams.id
        };

        $scope.getPackageID = function() {
            if ($scope.packageOnUse.Id === '') {
                // TODO: Show error
            } else {
                pkgServices.getPackageID($scope.packageOnUse.Id)
                    .then(function(_packageOnUse) {
                        $scope.packageOnUse = _packageOnUse.data;
                        console.log("getPackageID successful");
                    })
                    .catch(function() {
                        console.log("getPackageID failed");
                    });
            }
        };


    };

    // Injecting modules used for better minifing later on
    PkgCtrl.$inject = ['$scope', 'pkgServices', '$routeParams'];

    // Enabling the controller in the app
    angular.module('fairdiving').controller('PkgCtrl', PkgCtrl);

}());
