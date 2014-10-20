'use strict';

angular.module('cornpopApp', [
    'ngRoute',
    'cornpopApp.controllers',
    'cornpopApp.services'
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/movie/:movie_id', {
        templateUrl: '/templates/movie.html',
        controller: 'MovieController'
      })
      .when('/', {
        templateUrl: '/templates/movies.html',
        controller: 'MoviesController'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  })