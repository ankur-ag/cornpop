'use strict';

angular.module('cornpopApp.controllers')
.controller('LoginController',
  function($scope, $location, UserService) {
    $scope.signup = {};
    $scope.login = {};

    $scope.submitSignup = function() {
      UserService.login($scope.signup.email).then(function(user) {
        console.log(user);
        $scope.user = user;
        $location.path("/");
      });
    };

    $scope.submitLogin = function() {
      UserService.login($scope.login.email).then(function(user) {
        console.log(user);
        $scope.user = user;
        $location.path("/");
      });
    };
});