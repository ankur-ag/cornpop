'use strict';

angular.module('cornpopApp', [
    'ngRoute',
    'ngCookies',
    'cornpopApp.controllers',
    'cornpopApp.services',
    'cornpopApp.directives',
    'cornpopApp.resources',
    'cornpopApp.interceptors'
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
      .when('/login', {
        templateUrl: '/templates/login.html',
        controller: 'LoginController'
      })
      .when('/user/:user_id', {
        templateUrl: '/templates/profile.html',
        controller: 'ProfileController',
        resolve: {
          user: function($q, $route, $location, AuthService) {
            var d = $q.defer();

            AuthService.currentUser().then(function(user) {
              if (user && user.id == $route.current.params.user_id) {
                d.resolve();
              } else {
                $location.path('/');
              }
            });
            return d.promise;
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('UserAuthInterceptor');
  })
  .run(function($injector) {
    window.Movie = $injector.get("Movie");
    window.Favorite = $injector.get("Favorite");
  });