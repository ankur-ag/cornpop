'use strict';

angular.module('cornpopApp.controllers')
  .controller('MoviesController', ["$scope", '$routeParams', "UserService", "MoviesService","$q",
    function($scope, $routeParams, UserService, MoviesService, $q) {
      $q.all([UserService.currentUser(), MoviesService.movies()])
      .then(function(values) {
          var user = values[0];
          var movies = values[1];
          var promisedFavorites = _.map(movies, function(movie) {
            return Favorite.isFavorite(user, movie);
          });

          $q.all(promisedFavorites).then(function(favorites) {
            for(var i=0; i<movies.length; i++) {
              movies[i].isFavorite = favorites[i];
            }
            $scope.movies = movies;
          });
      });

      $scope.addFavorite = function(movie) {
        UserService.currentUser().then(function(user) {
          Favorite.createForUserAndMovie(user, movie).then(function() {
            movie.isFavorite = true;
          });
        });
      };

      $scope.removeFavorite = function(movie) {
        UserService.currentUser().then(function(user) {
          Favorite.createForUserAndMovie(user, movie).then(function() {
            movie.isFavorite = true;
          });
        });
      };
    }
  ]);