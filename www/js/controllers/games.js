angular.module('spatter.controllers')

.controller('GamesCtrl', function($scope, Games, $rootScope, $localstorage) {
  $scope.games = Games.get();
  $scope.gamesLoaded = false;
  $scope.noGames = false;

  Games.getAll().then(function(response){
    $localstorage.setObject('games', response);
    $scope.games = response;
    $scope.gamesLoaded = true;
    if($scope.games.length == 0){
      $scope.noGames = true;
    }
  });

  $scope.user = $localstorage.get('User');

  $scope.remove = function(game) {
    Games.remove(game);
  };

  $scope.doRefresh = function() {
    Games.getAll().then(function(response){
      $localstorage.setObject('games', response);
      $scope.games = response;
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
});
