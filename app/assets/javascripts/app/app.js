'use strict';

angular.module('cornpopApp', [
    'ngRoute',
    'ngCookies',
    'cornpopApp.controllers',
    'cornpopApp.services',
    'cornpopApp.directives'
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
      .when('/login', 
      {
        templateUrl: '/templates/login.html', 
        controller: 'LoginController'
      })
      .when('/user/:user_id', 
      {
        templateUrl: '/templates/profile.html', 
        controller: 'ProfileController'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  })