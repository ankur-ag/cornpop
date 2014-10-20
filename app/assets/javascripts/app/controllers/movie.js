'use strict';

angular.module('cornpopApp.controllers')
  .controller('MovieController', ['$scope', '$routeParams', "MoviesService", "$sce",
    function($scope, $routeParams, MoviesService, $sce) {
      $scope.movies = MoviesService.movies();
      $scope.movie = _.find($scope.movies,
        function(v) {
          return v.youtubeId == $routeParams.movie_id;
        });
      $scope.movie.youtubeUrl = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + $scope.movie.youtubeId + "?rel=0");
    }
  ]);