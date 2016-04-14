(function() {

    'use strict';

    // Created the controller to the user view
    var UserCtrl = function($scope, UserServices) {

        $scope.user = {
            token: null,
            logged: false,
            email: '',
            password: ''
        };
        $scope.errorMessage = "";
        $scope.toogle = true;

        $scope.$watch('toogle', function() {
            $scope.errorMessage = '';
        });

        $scope.login = function() {

            console.log($scope.user);
            $scope.errorMessage = '';
            if ($scope.user.email === '' || $scope.user.password === '') {
                $scope.errorMessage = "Email or password field cannot be empty.";
            } else {
                UserServices.login($scope.user)
                    .then(function() {
                        $scope.errorMessage = "";
                        $scope.user.logged = true;
                    })
                    .catch(function(err) {
                        $scope.errorMessage = err.data;
                        console.log("Login failed");
                    });
            }
        };


        $scope.register = function() {
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

                                var cElement = document.getElementsByClassName('countryNames');
                                for (var i = 0; i < cElement.length; i++) {
                                    if (cElement[i].value === $scope.user.country) {
                                        cElement[i].setAttribute("selected", "selected");
                                    }
                                }
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
            $scope.errorMessage = '';
            if ($scope.user.email !== '') {
                UserServices.forgetPassword({ email: $scope.user.email })
                    .then(function() {
                        $scope.errorMessage = "A recovery link was sent to your email.";
                    }).catch(function(err) {
                        $scope.errorMessage = "Oops, something happened.";
                        console.log(err);
                    });
            } else {
                $scope.errorMessage = "Email field cannot be empty.";
            }
        };


        // Function to trigger a reset password
        $scope.resetPassword = function(reset) {
            UserServices.resetPassword(reset)
                .then(function() {
                    $scope.errorMessage = "Your password was changed. You can now login.";
                    $scope.showUrlLogin = true;
                })
                .catch(function(err) {
                    $scope.errorMessage = err.data;
                });
        };

        //A function that updates userInfo
        $scope.updateUserInfo = function(updatedUser) {
            //faltam verificacoes
            UserServices.updateUserInfo(updatedUser)
                .then(function(updUser) {
                    $scope.user = updUser.data;
                    $scope.successMessage = "Your profile was successfully updated.";
                    console.log("updateUserInfo successful");
                })
                .catch(function(err) {
                    $scope.errorMessage = err.data;
                    console.log("updateUserInfo failed");
                });

        };

        // A function that asks for a password change.
        $scope.changePassword = function(passwords){
            
            if(passwords.oldpassword !== '' && passwords.newpassword !== '' && passwords.confirmpassword !== ''){
                UserServices.changepassword(passwords)
                    .then(function(updPassword){
                        $scope.confirmationInfo = updPassword.data;
                        var d = document.getElementById("info");
                        d.className = "alert alert-success";
                    })
                    .catch(function(err){
                        $scope.confirmationInfo = err.data;
                        var d = document.getElementById("info");
                        d.className = "alert alert-danger";
                    });
            }
        };

        $scope.logout = function() {

            UserServices.logout();

        };



    };

    // Injecting modules used for better minifing later on
    UserCtrl.$inject = ['$scope', 'UserServices'];

    // Enabling the controller in the app
    angular.module('fairdiving').controller('UserCtrl', UserCtrl);

}());
