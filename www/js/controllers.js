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
  $scope.userId = '1';
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
