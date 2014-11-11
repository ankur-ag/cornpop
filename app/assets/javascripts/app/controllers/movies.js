'use strict';

angular.module('cornpopApp.controllers')
  .controller('MoviesController', ["$scope", '$routeParams', "MoviesService",
    function($scope, $routeParams, MoviesService) {
      MoviesService.movies().then(function(movies) {
        $scope.movies = movies;
      });
    }
  ]);