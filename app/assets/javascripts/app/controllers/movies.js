'use strict';

angular.module('cornpopApp.controllers')
  .controller('MoviesController', ["$scope", '$routeParams', "MoviesService",
    function($scope, $routeParams, MoviesService) {
      MoviesService.movies().then(function(movies) {
        $scope.movies = movies;
      })
      $scope.addFavorite = function(movie) {
        movie.isFavorite = true;
      };

      $scope.removeFavorite = function(movie) {
        movie.isFavorite = false;
      };
    }
  ]);