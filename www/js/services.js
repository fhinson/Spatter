angular.module('spatter.services', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    },
    removeObject: function(key){
      $window.localStorage.removeItem(key);
    }
  }
}])

.factory('Games', function($http, $localstorage) {

  var games = $localstorage.getObject('games');

  var addGameComment = function(gameId, userId, commentText){
    return $http.post('http://spatter-api.dev/add_game_comment', {user_id: userId, game_id: gameId, comment_text: commentText})
      .then(function(response) {
        // response
      }, function(response) {
        // response
        console.log(response);
    });
  }

  var getGameComments = function(gameId){
    return $http({
      url: 'http://spatter-api.dev/get_game_comments',
      method: "GET",
      params: {game_id: gameId}
    }).then(function(response) {
        // response
        // console.log(response.data);
        return response.data;
      }, function(response) {
        // response
        console.log(response);
    });
  }

  return {
    all: function(){
      return games;
    },
    addComment: function(gameId, userId, commentText){
      addGameComment(gameId, userId, commentText);
    },
    getComments: function(gameId){
      return getGameComments(gameId);
    },
    remove: function(game) {
      games.splice(games.indexOf(game), 1);
    },
    get: function(gameId) {
      for (var i = 0; i < games.length; i++) {
        if (games[i].id === parseInt(gameId)) {
          return games[i];
        }
      }
      return null;
    }
  };
});
