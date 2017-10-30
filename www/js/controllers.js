angular.module('spatter.controllers', [])

.controller('GamesCtrl', function($scope, Games, $http, $rootScope) {

  $rootScope.$on('gamesRetrieved', function(event, response){
    $scope.games = response;
  });

  $scope.remove = function(game) {
    Games.remove(game);
  };
})

.controller('GameDetailCtrl', function($scope, $stateParams, $timeout, $ionicScrollDelegate, Games) {
  $scope.game = Games.get($stateParams.gameId);

  $scope.hideTime = false;

  var alternate,
    isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  var commenterColors = [
    "#E74C3C",
    "#9B59B6",
    "#2980B9",
    "#E67E22",
    "#2ECC71",
    "#F39C12",
    "#16A085",
    "#F30DFF",
    "#2C3E50",
    "#27AE60",
    "#3498DB",
    "#C0392B",
    "#D35400",
    "#F1C40F",
    "#1ABC9C",
    "#34495E",
    "#8E44AD",
  ];

  $scope.getUserAvatar = function(comment){
    var userIds = $scope.comments.map(a => a.user_id);
    var presentUserId = comment.user_id;
    var userIndex = userIds.indexOf(presentUserId);
    var userAvatar = "img/defaults/" + (userIndex+1).toString() + ".svg";
    return userAvatar;
  }

  $scope.getUserColor = function(comment){
    var userIds = $scope.comments.map(a => a.user_id);
    var presentUserId = comment.user_id;
    var userIndex = userIds.indexOf(presentUserId);
    var userColor = commenterColors[userIndex];
    return userColor;
  }

  $scope.sendComment = function() {
    var d = new Date();

    $scope.comments.push({
      user_id: $scope.user.id,
      comment: $scope.data.comment,
      upvotes: 0,
      downvotes: 0,
      created_at: d
    });

    Games.addComment($stateParams.gameId, $scope.user.id, $scope.data.comment);

    delete $scope.data.comment;
    $ionicScrollDelegate.scrollBottom(true);
  };

  $scope.upvoteComment = function(comment){
    comment.upvotes++;
    $scope.user.upvoted_comments.push(comment.id);
    console.log($scope.user.upvoted_comments);
    Games.upvoteComment($stateParams.gameId, comment.user_id, comment.comment);
  }

  $scope.downvoteComment = function(comment){
    comment.downvotes++;
    $scope.user.downvoted_comments.push(comment.id);
    Games.downvoteComment($stateParams.gameId, comment.user_id, comment.comment);
  }

  $scope.isUpvoted = function(comment){
    return $scope.user.upvoted_comments.indexOf(comment.id) !== -1 ? "upvoted" : "";
  }

  $scope.isDownvoted = function(comment){
    return $scope.user.downvoted_comments.indexOf(comment.id) !== -1 ? "downvoted" : "";
  }


  $scope.inputUp = function() {
    if (isIOS) $scope.data.keyboardHeight = 216;
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);

  };

  $scope.inputDown = function() {
    if (isIOS) $scope.data.keyboardHeight = 0;
    $ionicScrollDelegate.resize();
  };

  $scope.closeKeyboard = function() {
    // cordova.plugins.Keyboard.close();
  };


  $scope.data = {};
  $scope.user = {
    id: '1',
    upvoted_comments: [],
    downvoted_comments: [],
  }
  $scope.comments = [];
  Games.getComments($stateParams.gameId).then(function(response){
    $scope.comments = response;
    $ionicScrollDelegate.scrollBottom(true);
  });
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
