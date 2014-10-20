'use strict';

angular.module('cornpopApp.controllers')
  .controller('MoviesController', ["$scope", '$routeParams', "MoviesService",
    function($scope, $routeParams, MoviesService) {
      $scope.movies = MoviesService.movies();
      $scope.addFavorite = function(movie) {
        movie.isFavorite = true;
      };

      $scope.removeFavorite = function(movie) {
        movie.isFavorite = false;
      };
    }
  ]);