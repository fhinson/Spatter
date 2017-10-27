angular.module('spatter.services', [])

.factory('Games', function($http) {

  var games = [];

  var getGames = function(){
    return $http.get('http://spatter-api.herokuapp.com/todays_games')
      .then(function(response) {
        // response
        return response.data;
      }, function(response) {
        // response
        console.log(response);
    });
  }

  // Some fake testing data

  return {
    all: getGames,
    remove: function(chat) {
      games.splice(games.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < games.length; i++) {
        if (games[i].id === parseInt(chatId)) {
          return games[i];
        }
      }
      return null;
    }
  };
});
