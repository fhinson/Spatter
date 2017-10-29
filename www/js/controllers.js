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

  // $scope.getUserIndex = function(comment){
  //   var userIds = $scope.comments.map(a => a.user_id);
  //   var presentUserId = comment.user_id;
  //   var userIndex = userIds.indexOf(presentUserId);
  // }

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
      user_id: $scope.userId,
      comment: $scope.data.comment,
      created_at: d
    });

    Games.addComment($stateParams.gameId, $scope.userId, $scope.data.comment);

    delete $scope.data.comment;
    $ionicScrollDelegate.scrollBottom(true);
  };


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
  $scope.userId = '2';
  $scope.comments = [];
  Games.getComments($stateParams.gameId).then(function(response){
    $scope.comments = response;
  });
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
