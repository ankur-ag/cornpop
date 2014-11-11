'use strict';

angular.module('cornpopApp.directives', [])
  .directive('userPanel', function() {
    return {
      templateUrl: '/templates/user_panel.html',
      controller: function($scope, UserService) {
        $scope.$on('user:set', function(evt, currentUser) {
          $scope.currentUser = currentUser;
        });

        UserService.currentUser()
          .then(function(currentUser) {
            $scope.currentUser = currentUser;
          });

        $scope.logout = function() {
          UserService.logout()
            .then(function() {
              $scope.currentUser = null;
            });
        };

      }
    };
  }).directive('userFavorite', function($q, UserService, Favorite) {
    return {
      restrict: 'A',
      scope: {
        cpMovie: '='
      },
      templateUrl: '/templates/user_favorite.html',
      link: function($scope) {
        $scope.$watch('cpMovie', function(newValue, oldValue) {
          if (newValue) {
            UserService.currentUser().then(function(user) {
              if (user) {
                $scope.currentUser = user;
                Favorite.isFavorite(user, $scope.cpMovie).then(
                  function(isFavorite) {
                    $scope.isFavorite = isFavorite;
                  });
              } else {
                $scope.isFavorite = false;
              }
            });
          }
        });

        $scope.addFavorite = function(movie) {
          UserService.currentUser().then(function(user) {
            Favorite.createForUserAndMovie(user, movie).then(function() {
              $scope.isFavorite = true;
            });
          });
        };

        $scope.removeFavorite = function(movie) {
          UserService.currentUser().then(function(user) {
            Favorite.removeFavorite(user, movie).then(function() {
              $scope.isFavorite = false;
            });
          });
        };

        $scope.$on('user:unset', function() {
          $scope.currentUser = null;
        });
      }
    };
  });