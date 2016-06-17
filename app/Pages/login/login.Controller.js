

//////  login controller to check and validate the user who has logged in///////


(function () {

    'use strict';

    //get the module and invoke controller function   

    angular.module('app.pages.login').controller('loginController', ['$scope', '$http', '$state', '$cookies', 'loginServices', fnLoginController]);
    /* jshint validthis: true */

    function fnLoginController($scope, $http, $state, $cookies, loginServices) {
        var loginViewModel = this;
        loginViewModel.loginData = { UserId: 0, Email: "", Role: "", IsAuthenticated: false, Password: "" };
        loginViewModel.Title = "Login";
        loginViewModel.login = loginService;
        loginViewModel.loginAuthenticatedData = {};
        loginViewModel.loginmessage = { ErrorMessage: "", ServiceErrorMessage: "" };


        function loginService() {

            var validateUser = loginServices.loginUser(loginViewModel.loginData);

            ////////////// Route the user based on authentication /////////////
            validateUser.then(function (loginResponse) {
                loginViewModel.loginAuthenticatedData = loginResponse.data;
                // alert(loginViewModel.loginAuthenticatedData.IsValid);
                if (loginResponse != null && loginViewModel.loginAuthenticatedData.IsValid == true) {

                    //show dashborad to authenticated user//
                    $cookies.Email = loginViewModel.loginAuthenticatedData.Email;
                    $cookies.put("USER", loginViewModel.loginAuthenticatedData.Email);
                    var User = $cookies.get("USER");
                    window.location.href = "Index.html";
                    console.log('logged in successfully.');
                } else {

                    loginViewModel.loginmessage.ErrorMessage = loginViewModel.loginAuthenticatedData.ErrorMessage;
                   // window.location.href = "Index.html";
                    $state.go('Main');
                    // alert('Log-in failed' + '' + loginViewModel.loginAuthenticatedData.ErrorMessage);
                }

            }, function (loginfailResponse) {
                loginViewModel.loginAuthenticatedData = loginfailResponse.data;
                /// when user is not valid user.
                if (loginfailResponse != null && loginViewModel.loginAuthenticatedData.IsValid == false) {
                    loginViewModel.loginmessage.ErrorMessage = loginViewModel.loginAuthenticatedData.ErrorMessage;
                    console.log('log-in failed.');

                }
                //// when authentication fails becasue of some failure of system
                if (loginfailResponse == null) {
                    loginViewModel.loginmessage.ErrorMessage = loginViewModel.loginAuthenticatedData.ErrorMessage;
                    console.log('log-in failed')
                }
            });

            ////////////// END Route the user based on authentication /////////////

        }
    }
