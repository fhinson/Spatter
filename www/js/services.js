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

.factory('Users', function($http, ServerUrl, $localstorage){
  var getUser = function(userId){
    return $http({
      url: ServerUrl + '/get_user',
      method: "GET",
      params: {user_id: userId}
    }).then(function(response) {
        // response
        // console.log(response.data);
        return response.data;
      }, function(response) {
        // response
        console.log(response);
    });
  }

  return{
    getUser: function(userId){
      return getUser(userId);
    },
    get: function(){
      return $localstorage.getObject('user');
    }
  }
})

.factory('Games', function($http, $localstorage, ServerUrl) {

  var games = $localstorage.getObject('games');

  var getGames = function(){
    return $http.get(ServerUrl + '/todays_games')
      .then(function(response) {
        // response
        return response.data;
      }, function(response) {
        // response
        console.log(response);
    });
  }

  var addGameComment = function(gameId, userId, commentText){
    return $http.post(ServerUrl + '/add_game_comment', {user_id: userId, game_id: gameId, comment_text: commentText})
      .then(function(response) {
        // response
        return response.data;
      }, function(response) {
        // response
        console.log(response);
    });
  }

  var getGameComments = function(gameId){
    return $http({
      url: ServerUrl + '/get_game_comments',
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

  var upvoteGameComment = function(comment, user){
    return $http.post(ServerUrl + '/upvote_comment', {comment_id: comment.id, user_id: user.id})
      .then(function(response) {
        // response
      }, function(response) {
        // response
        console.log(response);
    });
  }

  var downvoteGameComment = function(comment, user){
    return $http.post(ServerUrl + '/downvote_comment', {comment_id: comment.id, user_id: user.id})
      .then(function(response) {
        // response
      }, function(response) {
        // response
        console.log(response);
    });
  }

  var unUpvoteGameComment = function(comment, user){
    return $http.post(ServerUrl + '/un_upvote_comment', {comment_id: comment.id, user_id: user.id})
      .then(function(response) {
        // response
      }, function(response) {
        // response
        console.log(response);
    });
  }

  var unDownvoteGameComment = function(comment, user){
    return $http.post(ServerUrl + '/un_downvote_comment', {comment_id: comment.id, user_id: user.id})
      .then(function(response) {
        // response
      }, function(response) {
        // response
        console.log(response);
    });
  }

  var flagGameComment = function(comment, user){
    return $http.post(ServerUrl + '/flag_comment', {comment_id: comment.id, user_id: user.id})
      .then(function(response) {
        // response
      }, function(response) {
        // response
        console.log(response);
    });
  }

  return {
    all: function(){
      return games;
    },
    getAll: function(){
      return getGames();
    },
    addComment: function(gameId, userId, commentText){
      return addGameComment(gameId, userId, commentText);
    },
    getComments: function(gameId){
      return getGameComments(gameId);
    },
    upvoteComment: function(comment, user){
      return upvoteGameComment(comment, user);
    },
    downvoteComment: function(comment, user){
      return downvoteGameComment(comment, user);
    },
    unUpvoteComment: function(comment, user){
      return unUpvoteGameComment(comment, user);
    },
    unDownvoteComment: function(comment, user){
      return unDownvoteGameComment(comment, user);
    },
    flagComment: function(comment, user){
      return flagGameComment(comment, user);
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
