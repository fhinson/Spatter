angular.module('spatter.controllers', [])

.controller('GamesCtrl', function($scope, Games, $http, $rootScope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $rootScope.$on('gamesRetrieved', function(event, response){
    $scope.games = response;
  });

  $scope.remove = function(game) {
    Games.remove(game);
  };
})

.controller('GameDetailCtrl', function($scope, $stateParams, Games) {
  $scope.game = Games.get($stateParams.gameId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
