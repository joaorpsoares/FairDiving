(function() {

    'use strict';

    // Created the controller to the user view
    var UserCtrl = function($scope, UserServices) {

        $scope.user = {
            token: null,
            logged: false
        };
        $scope.updatedUser = {};
        $scope.errorMessage = "";
        $scope.toogle = true;

        $scope.login = function() {
            if ($scope.user.email === '' || $scope.user.password === '') {
                // TODO: Show error
            } else {
                UserServices.login($scope.user)
                    .then(function() {
                        $scope.errorMessage = "";
                        $scope.user.logged = true;
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

        //A function that gets the logged user
        $scope.getLoggedUser = function() {
            //     if ($scope.user.Id === '') {
            //       // TODO: Show error
            //  } else {
            var cookies = document.cookie;
            if (document.cookie.match(/session\=(\w|.)*/)) {
                UserServices.getLoggedUserToken()
                    .then(function(token) {
                        UserServices.getLoggedUser(token.data)
                            .then(function(user) {
                                $scope.user = user.data[0];
                                $scope.user.logged = true;
                            })
                            .catch(function(err) {
                                console.log(err);
                            });
                    })
                    .catch(function() {
                        console.log("getLoggedUser failed");
                    });
            } else $scope.user.logged = false;
            //    }
        };

        // Function to reset password
        $scope.forgetPassword = function() {
            if ($scope.user.email !== '') {
                UserServices.forgetPassword({ email: $scope.user.email })
                    .then(function() {
                        console.log("check your mail.");
                    }).catch(function(err) {
                        console.log(err);
                    });
            }
        };


        // Function to trigger a reset password
        $scope.resetPassword = function(reset) {
            UserServices.resetPassword(reset)
                .then(function() {
                    $scope.errorMessage = "Your password was changed. You can now login.";
                })
                .catch(function(err) {
                    $scope.errorMessage = err.data;
                });
        };
        //A function that updates userInfo
        /*   $scope.updateUserInfo = function() {
               //faltam verificacoes

               UserServices.getLoggedUserToken()
                   .then(function(token) {
                       UserServices.getLoggedUser(token.data)
                           .then(function(user) {
                               $scope.user = user.data[0];
                               $scope.user.token = token.data;
                               console.log(token.data);
                               UserServices.updateUserInfo($scope.user, $scope.updatedUser)
                                   .then(function() {
                                       $scope.user = $scope.updatedUser;
                                       console.log("updateUserInfo successful");
                                   })
                                   .catch(function() {
                                       console.log("updateUserInfo failed");
                                   });
                           })
                           .catch(function() {
                               console.log(err);
                           });
                       console.log("getLoggedUser successful");
                   })
                   .catch(function() {
                       console.log("getLoggedUser failed");
                   });
           };*/



    };

    // Injecting modules used for better minifing later on
    UserCtrl.$inject = ['$scope', 'UserServices'];

    // Enabling the controller in the app
    angular.module('fairdiving').controller('UserCtrl', UserCtrl);

}());
