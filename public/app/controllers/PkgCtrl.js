(function() {

    'use strict';

    // Created the controller to the package view
    var PkgCtrl = function($scope, pkgServices, $routeParams) {

        $scope.packages = {};
        $scope.packageOnUse = {
            Id: $routeParams.id
        };

        //A function that gets a package by id
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

        //A function that inserts a new package
        $scope.insertNewPackage = function(newPackage) {
            //  if ($scope.newPackage.title === "" || $scope.newPackage.certification === "" || $scope.newPackage.difficulty === "" || $scope.newPackage.n_dives === "" || $scope.newPackage.dive_sites === "" || $scope.newPackage.description === "" || $scope.newPackage.price === "") {
            // TODO: Show error
            // } else {
            console.log("qewqe");
            pkgServices.insertNewPackage(newPackage)
                .then(function() {
                    console.log("Insert new package successful");
                })
                .catch(function() {
                    console.log("Insert new package failed");
                });
            //}

        };


    };

    // Injecting modules used for better minifing later on
    PkgCtrl.$inject = ['$scope', 'pkgServices', '$routeParams'];

    // Enabling the controller in the app
    angular.module('fairdiving').controller('PkgCtrl', PkgCtrl);

}());
