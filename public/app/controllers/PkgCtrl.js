(function() {

    'use strict';

    // Created the controller to the package view
    var PkgCtrl = function($scope, pkgServices, $routeParams, Upload) {

        $scope.packages = {};
        $scope.packageOnUse = {
            Id: $routeParams.id
        };

        $scope.countries = [];

        //A function that gets all packages
        $scope.getPackages = function() {

            pkgServices.getPackages()
                .then(function(_packages) {
                    $scope.packages = _packages.data;
                    console.log("getPackages successful");
                })
                .catch(function() {
                    console.log("getPackages failed");
                });

        };

        //A function that gets a package by id
        $scope.getPackageID = function() {
            if ($scope.packageOnUse.Id === '') {
                // TODO: Show error
            } else {
                pkgServices.getPackageID($scope.packageOnUse.Id)
                    .then(function(_packageOnUse) {
                        $scope.packageOnUse = _packageOnUse.data;
                    })
                    .catch(function() {
                        console.log("getPackageID failed");
                    });
            }
        };

        $scope.getPackagesOfLoggedUser = function() {
            // if ($scope.packageOnUse.Id === '') {
            // TODO: Show error
            //  } else {
            pkgServices.getPackagesOfLoggedUser()
                .then(function(_packages) {
                    $scope.packages = _packages.data;
                })
                .catch(function() {
                    console.log("getPackageOfLoggedUser failed");
                });
            //  }
        };


        //A function that inserts a new package
        $scope.insertNewPackage = function(newPackage) {
            //  if ($scope.newPackage.title === "" || $scope.newPackage.certification === "" || $scope.newPackage.difficulty === "" || $scope.newPackage.n_dives === "" || $scope.newPackage.dive_sites === "" || $scope.newPackage.description === "" || $scope.newPackage.price === "") {
            // TODO: Show error
            // } else {
            pkgServices.insertNewPackage(newPackage)
                .then(function() {
                    console.log("Insert new package successful");
                })
                .catch(function(err) {
                    console.log(err);
                    console.log("Insert new package failed");
                });
            //}
        };


        // A function to retrieve a country
        $scope.getCountries = function() {

            pkgServices.getCountries()
                .then(function(result) {
                    $scope.countries = result.data;
                })
                .catch(function(err) {
                    console.log('It was impossible to retrieve the countries');
                });
        };

        $scope.submit = function() {
            if ($scope.form.file.$valid && $scope.newPackage.pickFile) {
                $scope.upload($scope.newPackage.pickFile);

            }
        };

        // upload on file select or drop
        $scope.upload = function(file) {

            console.log(file);
            $scope.newPackage.avatar = file;
            delete $scope.newPackage.pickFile;

            pkgServices.insertNewPackage($scope.newPackage)
                .then(function() {
                    console.log("Insert new package successful");
                })
                .catch(function() {
                    console.log("Insert new package failed");
                });

            console.log($scope.newPackage);
            /*
            Upload.upload({
                url: '/api/package/',
                data: $scope.newPackage,
                method: 'POST',
                disableProgress: true
            }).then(function(resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            });
            */
        };

    };

    // Injecting modules used for better minifing later on
    PkgCtrl.$inject = ['$scope', 'pkgServices', '$routeParams', 'Upload'];

    // Enabling the controller in the app
    angular.module('fairdiving').controller('PkgCtrl', PkgCtrl);

}());
