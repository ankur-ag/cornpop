'use strict';

angular.module('cornpopApp.resources', ["rails"])
  .factory('Movie',
    function (railsResourceFactory, $q) {
        var resource = railsResourceFactory({
            url: '/movies',
            name: 'movie'});
        resource.findOrCreateByYoutubeId = function(youtubeId, otherAttributes) {
            var d = $q.defer();
            resource.query({youtube_id: youtubeId})
               .then(function(movies) {
                   if(movies.length > 0) {
                       d.resolve(movies[0]); // we have the movie, return it
                   } else {
                      var createAttributes = _.extend(
                            otherAttributes,
                            {youtube_id: youtubeId}
                        );
                      var movie = new resource(createAttributes);
                        movie.save().then(function() {
                            d.resolve(movie);
                        });
                   }
               });
           return d.promise;
       };

       return resource;
   })
  .factory('Favorite', 
    function (railsResourceFactory, $q) {
      var resource = railsResourceFactory({ 
        url: '/favorites', 
        name: 'favorite'});

      resource.createForUserAndMovie = function(user, movie) {
        var favorite = new resource({
          user_id: user.id, 
          movie_id: movie.id
        });
        return favorite.save();
      };

      resource.removeFavorite = function(user, movie) {
        var favorite = resource.query({
            user_id: user.id, 
            movie_id: movie.id
        });

        return favorite.then(function(results) {
            if(results.length > 0) {
                favorite = results[0];
                favorite.delete();
            }
        });
      };

      resource.isFavorite = function(user, movie) {
        var d = $q.defer();
        var favorite = resource.query({
          user_id: user.id, 
          movie_id: movie.id
        });

        favorite.then(function(results) {
          d.resolve(results.length > 0);
        }, function(err) {
          d.reject(err);
        });
      };

      return resource;
    });